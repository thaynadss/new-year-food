-- Create the people table
CREATE TABLE IF NOT EXISTS people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  food VARCHAR(500),
  drink VARCHAR(500),
  dessert VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create an index on the name for faster lookups
CREATE INDEX IF NOT EXISTS idx_people_name ON people(name);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_people_updated_at
  BEFORE UPDATE ON people
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (read and write)
-- Note: For a production app, you might want more restrictive policies
CREATE POLICY "Enable read access for all users" ON people
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON people
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON people
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON people
  FOR DELETE USING (true);
