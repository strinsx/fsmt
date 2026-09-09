do $$ begin
  create type public.income_transaction_status as enum ('pending', 'cleared', 'cancelled');
exception when duplicate_object then null;
end $$;

alter table public.income_transactions
  add column if not exists status public.income_transaction_status not null default 'pending'::public.income_transaction_status;

alter table public.income_transactions drop column if exists description;

create or replace function public.handle_project_completed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  txn_amount numeric(14,2);
begin
  if new.status = 'completed'::public.project_status and old.status != 'completed'::public.project_status then
    txn_amount := coalesce(new.project_value, 0)::numeric(14,2);
    if txn_amount is null or txn_amount <= 0 then
      return new;
    end if;
    if exists (select 1 from public.income_transactions where project_id = new.id) then
      return new;
    end if;
    insert into public.income_transactions (user_id, project_id, amount, received_at, status)
    values (
      new.user_id,
      new.id,
      txn_amount,
      current_date,
      'pending'::public.income_transaction_status
    );
  end if;
  return new;
exception when others then
  return new;
end;
$$;

drop trigger if exists on_project_completed on public.projects;
create trigger on_project_completed
  after update on public.projects
  for each row execute function public.handle_project_completed();
