import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  useEffect(() => {
    const redirect = async () => {
      // 0.5초 정도 대기 후 이동 (네비게이터 초기화 시간 확보)
      await new Promise(resolve => setTimeout(resolve, 500));

      const isLoggedIn = true; // 로그인 여부 체크 로직
      if (isLoggedIn) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/auth/login');
      }
    };

    redirect();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
