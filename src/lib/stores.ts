import { writable } from 'svelte/store';
import { supabase } from './supabase';

// Theme store
export const theme = writable('dark');

// Active section store for navigation
export const activeSection = writable('home');

// Portfolio filters
export const activeFilter = writable('*');

// Mobile menu state
export const isMobileMenuOpen = writable(false);

// Contact form store
export const contactForm = writable({
  name: '',
  email: '',
  subject: '',
  message: '',
  loading: false,
  success: false,
  error: null
});

// Projects store
export const projects = writable([]);

// Auth store
export const isAuthenticated = writable(false);

// Load projects from Supabase
export async function loadProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error loading projects:', error);
    return;
  }
  
  projects.set(data || []);
}

// Add new project
export async function addProject(projectData) {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData]);
    
  if (error) {
    console.error('Error adding project:', error);
    return { success: false, error };
  }
  
  await loadProjects();
  return { success: true, data };
}