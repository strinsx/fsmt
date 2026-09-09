create type public.project_status as enum ('active', 'pending', 'completed');

create table public.projects (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  status public.project_status not null default 'active'::public.project_status,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  client text null,
  project_value numeric(12, 2) null,
  constraint projects_pkey primary key (id),
  constraint projects_user_id_fkey foreign key (user_id) references public.profiles (id) on delete cascade,
  constraint projects_name_not_blank check (length(trim(name)) > 0),
  constraint projects_project_value_nonnegative check (project_value is null or project_value >= 0)
);

create index projects_user_id_created_at_idx
  on public.projects (user_id, created_at desc);

alter table public.projects enable row level security;

create policy "Users can view own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can insert own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();
