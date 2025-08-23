import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import supabase from '../app/auth/supabase';

export default function Index() {
  useEffect(() => {
    const redirect = async () => {
      // 앱 시작 시 세션 확인
      const { data: { session } } = await supabase.auth.getSession()
      console.log("앱 시작 시 세션 확인 : ", session)
      if (session) {
        router.replace('/home')
        console.log("세션 확인됨. 홈으로")
      } else {
        router.replace('/auth/login')
        console.log("세션 확인 안됨.")
      }
    }

    // 세션 변화 감지
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/home')
      } else {
        router.replace('/auth/login')
      }
    })

    redirect()
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

