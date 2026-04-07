-- Run in Supabase SQL editor
create table if not exists public.programari (
  id bigserial primary key,
  nume text not null,
  telefon text not null,
  email text not null,
  categorie text not null,
  pasiuni text,
  mesaj text,
  factura_utilitati_path text,
  extras_cont_path text,
  buletin_path text,
  created_at timestamptz default now()
);

-- If table already exists, add the new columns:
alter table public.programari add column if not exists pasiuni text;
alter table public.programari add column if not exists factura_utilitati_path text;
alter table public.programari add column if not exists extras_cont_path text;
alter table public.programari add column if not exists buletin_path text;

alter table public.programari enable row level security;

drop policy if exists "anon insert programari" on public.programari;
create policy "anon insert programari"
  on public.programari for insert
  to anon
  with check (true);

-- Storage bucket for uploaded documents (private)
insert into storage.buckets (id, name, public)
  values ('documente', 'documente', false)
  on conflict (id) do nothing;

-- Allow anonymous uploads to the documente bucket
drop policy if exists "anon upload documente" on storage.objects;
create policy "anon upload documente"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'documente');
