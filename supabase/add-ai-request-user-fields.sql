-- Run in Supabase SQL Editor if ai_requests already exists without user_email / user_name

alter table ai_requests add column if not exists user_email text;
alter table ai_requests add column if not exists user_name text;

create index if not exists ai_requests_user_email_idx on ai_requests(user_email);
