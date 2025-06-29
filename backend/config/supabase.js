const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vrtuheynwghrjltkkqbg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydHVoZXlud2docmpsdGtrcWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzU0NDcsImV4cCI6MjA2NjcxMTQ0N30.lWwt4X-jXb-l6sdwwqkQpx83DXO3AiBk2u4inVI2fE8';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
