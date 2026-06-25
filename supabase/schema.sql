create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null references auth.users(id) on delete cascade,
  name text,
  phone text,
  gender text,
  birth_date date,
  zip_code text,
  city text,
  address text,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trail_completions (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null references auth.users(id) on delete cascade,
  user_name text,
  trail_name text not null,
  trail_type text,
  status text,
  distance_km numeric,
  elevation_m numeric,
  registration_date timestamptz,
  completion_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;
alter table public.trail_completions enable row level security;

drop policy if exists "Users can read own profile" on public.user_profiles;
create policy "Users can read own profile"
  on public.user_profiles for select
  using (auth.uid() = created_by_id);

drop policy if exists "Users can insert own profile" on public.user_profiles;
create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = created_by_id);

drop policy if exists "Users can update own profile" on public.user_profiles;
create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = created_by_id)
  with check (auth.uid() = created_by_id);

drop policy if exists "Completed trails are public" on public.trail_completions;
create policy "Completed trails are public"
  on public.trail_completions for select
  using (status = 'Teljesítve' or auth.uid() = created_by_id);

drop policy if exists "Users can insert own completions" on public.trail_completions;
create policy "Users can insert own completions"
  on public.trail_completions for insert
  with check (auth.uid() = created_by_id);

drop policy if exists "Users can update own completions" on public.trail_completions;
create policy "Users can update own completions"
  on public.trail_completions for update
  using (auth.uid() = created_by_id)
  with check (auth.uid() = created_by_id);
