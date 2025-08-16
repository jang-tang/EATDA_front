// 앱 내 화면 전환을 관리하는 Stack 컴포넌트
import { Stack } from 'expo-router';

// 다크 모드/라이트 모드 테마 지원을 위한 테마 관련 요소들
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// 디바이스의 현재 다크/라이트 모드 상태를 가져오는 hook
import { Animated, StyleSheet, useColorScheme } from 'react-native';

// React의 기본 훅 사용 (useState, useEffect, useRef)
import { useEffect, useRef, useState } from 'react';

// 초기 로딩 화면으로 사용할 커스텀 컴포넌트 (Lottie 애니메이션 포함)
import Lottie from './lottie';

export default function Layout() {
  // 현재 디바이스의 색상 테마를 감지 ('dark' 또는 'light')
  const colorScheme = useColorScheme();

  // splash 화면(Lottie)를 보여줄지 여부를 상태로 관리
  const [showSplash, setShowSplash] = useState(true);

  // Animated.Value를 통해 투명도(opacity) 상태를 생성 (초기값 1: 완전 불투명)
  const opacity = useRef(new Animated.Value(1)).current;

  // 컴포넌트가 처음 마운트될 때 실행되는 코드 (splash 타이머와 페이드 아웃 애니메이션 설정)
  useEffect(() => {
    // 3초 뒤에 실행되는 타이머 설정
    const timer = setTimeout(() => {
      // Animated API를 사용하여 투명도를 0으로 줄이면서 페이드 아웃 실행
      Animated.timing(opacity, {
        toValue: 0,        // 0으로 만들면 완전 투명
        duration: 300,     // 300ms 동안 애니메이션 실행
        useNativeDriver: true, // GPU를 활용한 애니메이션 최적화
      }).start(() => {
        // 애니메이션이 끝나면 splash 화면을 제거
        setShowSplash(false);
      });
    }, 3000); // 3초 동안 splash 화면 유지

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, []);

  return (
    // 전체 앱에 테마 적용 (다크/라이트 모드에 따라)
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* splash 화면을 보여줄 상태라면 */}
      {showSplash ? (
        // Animated.View를 사용해 페이드 아웃 애니메이션 효과 적용
        <Animated.View style={[StyleSheet.absoluteFill, { opacity, zIndex: 1 }]}>
          {/* 실제 splash 화면 컴포넌트 (Lottie 애니메이션 포함) */}
          <Lottie />
        </Animated.View>
      ) : null}

      {/* 나머지 실제 앱 화면을 표시하는 Stack Navigator */}
      <Stack screenOptions={{ headerShown: false}} />
    </ThemeProvider>
  );
}
