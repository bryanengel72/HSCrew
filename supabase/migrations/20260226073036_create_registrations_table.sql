CREATE TABLE IF NOT EXISTS registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'registrations' AND policyname = 'Allow anonymous inserts'
  ) THEN
    CREATE POLICY "Allow anonymous inserts"
    ON registrations
    FOR INSERT
    TO anon
    WITH CHECK (true);
  END IF;
END $$;