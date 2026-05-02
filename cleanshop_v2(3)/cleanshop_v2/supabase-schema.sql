-- ============================================================
-- CLEAN SHOP — Supabase Schema + RLS Policies
-- Coller dans : Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ── 1. TABLE REVIEWS ────────────────────────────────────────
create table if not exists public.reviews (
  id          uuid    default gen_random_uuid() primary key,
  product_id  integer not null,
  "user"      text    not null check (char_length("user") between 1 and 100),
  rating      integer not null check (rating between 1 and 5),
  comment     text    not null check (char_length(comment) between 1 and 2000),
  date        text    not null,
  status      text    not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at  timestamptz default now()
);

-- ── 2. TABLE ADMINS ─────────────────────────────────────────
create table if not exists public.admins (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamptz default now()
);

-- ── 3. RLS ──────────────────────────────────────────────────
alter table public.reviews enable row level security;
alter table public.admins  enable row level security;

-- Fonction helper admin
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (select 1 from public.admins where id = auth.uid());
$$;

-- Reviews : lecture publique des avis approuvés
drop policy if exists "Public read approved" on public.reviews;
create policy "Public read approved"
  on public.reviews for select using (status = 'approved');

-- Reviews : admin lit tout
drop policy if exists "Admin read all" on public.reviews;
create policy "Admin read all"
  on public.reviews for select using (public.is_admin());

-- Reviews : soumission publique (status = pending)
drop policy if exists "Public insert pending" on public.reviews;
create policy "Public insert pending"
  on public.reviews for insert with check (status = 'pending');

-- Reviews : modération admin
drop policy if exists "Admin update" on public.reviews;
create policy "Admin update"
  on public.reviews for update using (public.is_admin());

drop policy if exists "Admin delete" on public.reviews;
create policy "Admin delete"
  on public.reviews for delete using (public.is_admin());

-- Admins : lecture de sa propre entrée
drop policy if exists "Own admin row" on public.admins;
create policy "Own admin row"
  on public.admins for select using (id = auth.uid() or public.is_admin());

-- ── 4. REALTIME ─────────────────────────────────────────────
-- Activer aussi dans : Dashboard → Database → Replication → reviews ✓
alter publication supabase_realtime add table public.reviews;

-- ── 5. DONNÉES DE TEST ──────────────────────────────────────
insert into public.reviews (product_id, "user", rating, comment, date, status) values
  (1, 'Dorcas G.',     5, 'iPhone reçu en 2h, produit 100% authentique. Je recommande !', '2026-04-15', 'approved'),
  (2, 'Jean-Baptiste', 5, 'MacBook Air M3 parfait. Livraison rapide, garantie incluse.',  '2026-04-18', 'approved'),
  (7, 'Alain G.',      5, 'Starlink installé par leur équipe. Connexion stable à Bangui !','2026-04-25', 'approved');

-- ── 6. AJOUTER UN ADMIN ─────────────────────────────────────
-- Après connexion Google sur le site, récupère ton UUID dans :
-- Dashboard → Authentication → Users → copie l'UUID
--
-- insert into public.admins (id, email)
-- values ('TON-UUID-ICI', 'ton@email.com');
