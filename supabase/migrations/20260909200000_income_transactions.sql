do $$ begin
  create type public.income_transaction_status as enum ('pending', 'cleared', 'cancelled');
exception when duplicate_object then null;
end $$;

create table public.income_transactions (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  project_id uuid null,
  amount numeric(14, 2) not null,
  received_at date not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  status public.income_transaction_status not null default 'pending'::public.income_transaction_status,
  constraint income_transactions_pkey primary key (id),
  constraint income_transactions_project_id_fkey foreign key (project_id) references public.projects (id) on delete set null,
  constraint income_transactions_user_id_fkey foreign key (user_id) references public.profiles (id) on delete cascade,
  constraint positive_income_amount check (amount > 0)
) TABLESPACE pg_default;

create index if not exists income_transactions_user_id_created_at_idx
  on public.income_transactions using btree (user_id, created_at desc) TABLESPACE pg_default;

create index if not exists income_transactions_project_id_idx
  on public.income_transactions using btree (project_id) TABLESPACE pg_default;

alter table public.income_transactions enable row level security;

create policy "Users can view own income transactions"
  on public.income_transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own income transactions"
  on public.income_transactions for insert
  with check (
    auth.uid() = user_id
    and (
      project_id is null
      or exists (
        select 1 from public.projects
        where projects.id = project_id and projects.user_id = auth.uid()
      )
    )
  );

create policy "Users can update own income transactions"
  on public.income_transactions for update
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and (
      project_id is null
      or exists (
        select 1 from public.projects
        where projects.id = project_id and projects.user_id = auth.uid()
      )
    )
  );

create policy "Users can delete own income transactions"
  on public.income_transactions for delete
  using (auth.uid() = user_id);

create trigger set_income_transactions_updated_at
  before update on public.income_transactions
  for each row execute function public.handle_updated_at();
