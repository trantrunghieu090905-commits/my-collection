-- MY COLLECTION: run this script in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric(12,0) not null check (price >= 0),
  original_price numeric(12,0) check (original_price is null or original_price >= 0),
  image_url text,
  description text,
  affiliate_url text,
  platform text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admins enable row level security;
alter table public.products enable row level security;

drop policy if exists "Admins can read their own admin record" on public.admins;
create policy "Admins can read their own admin record"
on public.admins for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Anyone can view active products" on public.products;
create policy "Anyone can view active products"
on public.products for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Admins can view all products" on public.products;
create policy "Admins can view all products"
on public.products for select
to authenticated
using (exists (select 1 from public.admins where admins.user_id = auth.uid()));

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
on public.products for insert
to authenticated
with check (exists (select 1 from public.admins where admins.user_id = auth.uid()));

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
on public.products for update
to authenticated
using (exists (select 1 from public.admins where admins.user_id = auth.uid()))
with check (exists (select 1 from public.admins where admins.user_id = auth.uid()));

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
on public.products for delete
to authenticated
using (exists (select 1 from public.admins where admins.user_id = auth.uid()));

create index if not exists products_active_created_idx
on public.products (is_active, created_at desc);
