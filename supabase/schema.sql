-- Run in Supabase SQL editor
create table if not exists public.programari (
  id bigserial primary key,
  nume text not null,
  telefon text not null,
  email text not null,
  categorie text not null,
  mesaj text,
  created_at timestamptz default now()
);

alter table public.programari enable row level security;

-- Allow anonymous inserts from the website form
create policy "anon insert programari"
  on public.programari for insert
  to anon
  with check (true);
