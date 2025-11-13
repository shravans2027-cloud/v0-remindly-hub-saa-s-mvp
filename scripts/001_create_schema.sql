-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  company_name text,
  timezone text default 'UTC',
  notification_email boolean default true,
  notification_sms boolean default false,
  notification_push boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create reminders table
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  type text not null default 'task',
  priority text not null default 'medium',
  status text not null default 'active',
  due_date timestamp with time zone not null,
  reminder_time timestamp with time zone,
  frequency text default 'once',
  recurrence_end_date timestamp with time zone,
  category text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.reminders enable row level security;

create policy "reminders_select_own"
  on public.reminders for select
  using (auth.uid() = user_id);

create policy "reminders_insert_own"
  on public.reminders for insert
  with check (auth.uid() = user_id);

create policy "reminders_update_own"
  on public.reminders for update
  using (auth.uid() = user_id);

create policy "reminders_delete_own"
  on public.reminders for delete
  using (auth.uid() = user_id);

-- Create tax deadlines table
create table if not exists public.tax_deadlines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  due_date date not null,
  deadline_type text not null,
  entity_type text not null,
  state text,
  is_subscribed boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.tax_deadlines enable row level security;

create policy "tax_deadlines_select_own"
  on public.tax_deadlines for select
  using (auth.uid() = user_id);

create policy "tax_deadlines_insert_own"
  on public.tax_deadlines for insert
  with check (auth.uid() = user_id);

create policy "tax_deadlines_update_own"
  on public.tax_deadlines for update
  using (auth.uid() = user_id);

create policy "tax_deadlines_delete_own"
  on public.tax_deadlines for delete
  using (auth.uid() = user_id);

-- Create notifications table
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reminder_id uuid references public.reminders(id) on delete cascade,
  notification_type text not null,
  message text not null,
  read boolean default false,
  read_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

alter table public.notifications enable row level security;

create policy "notifications_select_own"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "notifications_insert_own"
  on public.notifications for insert
  with check (auth.uid() = user_id);

create policy "notifications_update_own"
  on public.notifications for update
  using (auth.uid() = user_id);

-- Create activity log table
create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  action text not null,
  resource_type text,
  resource_id text,
  details jsonb,
  created_at timestamp with time zone default now()
);

alter table public.activity_log enable row level security;

create policy "activity_log_select_own"
  on public.activity_log for select
  using (auth.uid() = user_id);

create policy "activity_log_insert_own"
  on public.activity_log for insert
  with check (auth.uid() = user_id);

-- Create integrations table
create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  integration_type text not null,
  is_connected boolean default false,
  credentials jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.integrations enable row level security;

create policy "integrations_select_own"
  on public.integrations for select
  using (auth.uid() = user_id);

create policy "integrations_insert_own"
  on public.integrations for insert
  with check (auth.uid() = user_id);

create policy "integrations_update_own"
  on public.integrations for update
  using (auth.uid() = user_id);

create policy "integrations_delete_own"
  on public.integrations for delete
  using (auth.uid() = user_id);

-- Create subscription table
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null,
  status text not null default 'active',
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "subscriptions_insert_own"
  on public.subscriptions for insert
  with check (auth.uid() = user_id);

create policy "subscriptions_update_own"
  on public.subscriptions for update
  using (auth.uid() = user_id);

-- Create indexes for performance
create index idx_reminders_user_id on public.reminders(user_id);
create index idx_reminders_due_date on public.reminders(due_date);
create index idx_tax_deadlines_user_id on public.tax_deadlines(user_id);
create index idx_notifications_user_id on public.notifications(user_id);
create index idx_activity_log_user_id on public.activity_log(user_id);
