import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fouzmbtgqfywtppdwows.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvdXptYnRncWZ5d3RwcGR3b3dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0Mzc1ODgsImV4cCI6MjA5NzAxMzU4OH0.ZElNJoGX2yVior8NRJ3tyb1lHnUrZSMAsGCm20w1crA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);