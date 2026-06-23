-- Run this in your Supabase SQL Editor
-- Enable Google OAuth in Supabase Dashboard: Authentication > Providers > Google

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text unique,
  avatar_url text,
  role text default 'student',
  created_at timestamptz default now()
);

alter table users enable row level security;

create policy "Users can read own profile"
  on users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on users for update
  using (auth.uid() = id);

create table if not exists ai_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  user_email text,
  user_name text,
  tool_name text not null,
  prompt text not null,
  response text not null,
  created_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  created_at timestamptz default now()
);

create index if not exists ai_requests_tool_name_idx on ai_requests(tool_name);
create index if not exists ai_requests_created_at_idx on ai_requests(created_at desc);
