// ./auth/supabase.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dkoxmnvmgnkpkdubsqje.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrb3htbnZtZ25rcGtkdWJzcWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjc1ODAsImV4cCI6MjA3MDkwMzU4MH0.DwwUsYXpB8aI7OS-SjXR5dNe4eQDUVMn6bQxxq0AUnM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,      // 세션 저장
    autoRefreshToken: true,    // 토큰 만료 시 자동 갱신
    detectSessionInUrl: false, // Expo는 URL 세션 감지 필요 없음
    storage: AsyncStorage,     // AsyncStorage로 세션 저장
  },
});

export default supabase;
