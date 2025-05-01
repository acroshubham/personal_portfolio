import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// In production, these would come from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function sendContactMessage(name: string, email: string, subject: string, message: string) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        { name, email, subject, message }
      ]);
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error };
  }
}