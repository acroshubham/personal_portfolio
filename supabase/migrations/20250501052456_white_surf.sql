/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `subject` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamp with time zone, default: now())
  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for authenticated users to insert data
*/

-- Create the contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy for inserting new messages (anyone can submit)
CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy for viewing messages (only service role can read)
CREATE POLICY "Only service role can read messages"
  ON contact_messages
  FOR SELECT
  TO service_role
  USING (true);