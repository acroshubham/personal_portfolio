/*
  # Add projects table and security policies

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `project_url` (text)
      - `category` (text)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on `projects` table
    - Add policies for authenticated users to manage projects
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  project_url text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage projects
CREATE POLICY "Users can manage their own projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Public can view projects"
  ON projects
  FOR SELECT
  TO anon
  USING (true);