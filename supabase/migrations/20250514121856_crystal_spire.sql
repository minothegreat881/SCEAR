/*
  # Admin System Schema

  1. New Tables
    - `admin_profiles`
      - `id` (uuid, primary key, linked to auth.users)
      - `email` (text, unique)
      - `role` (text)
      - `created_at` (timestamp)
      - `last_login` (timestamp)
    
    - `gallery_items`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references admin_profiles)

    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `start_date` (timestamp)
      - `end_date` (timestamp)
      - `location` (text)
      - `category` (text)
      - `image_url` (text)
      - `max_participants` (integer)
      - `current_participants` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references admin_profiles)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create admin_profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create gallery_items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES admin_profiles(id)
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  max_participants integer,
  current_participants integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES admin_profiles(id)
);

-- Enable RLS
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_profiles
CREATE POLICY "Admins can view own profile"
  ON admin_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for gallery_items
CREATE POLICY "Public can view gallery items"
  ON gallery_items
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Admins can manage gallery items"
  ON gallery_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Create policies for events
CREATE POLICY "Public can view events"
  ON events
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Admins can manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );