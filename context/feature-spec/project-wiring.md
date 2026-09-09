# Project Wiring

Read `AGENTS.md` before executing this file

wire the projects table to the projects table schema

create table public.projects (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  name text not null,
  status public.project_status not null default 'active'::project_status,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  client text null,
  project_value numeric(12, 2) null,
  constraint projects_pkey primary key (id),
  constraint projects_user_id_fkey foreign KEY (user_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;

Requirements
- just wire don't refactor any ui elements

# Complete when
- no lint errors
- the it is wired completely. 


