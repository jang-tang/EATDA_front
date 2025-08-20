//login.tsx
// Expo OAuth 및 웹 브라우저 지원 모듈 import
import { makeRedirectUri } from 'expo-auth-session'; // OAuth 리디렉션 URI 생성
import * as Google from 'expo-auth-session/providers/google'; // 구글 로그인 provider
import * as WebBrowser from 'expo-web-browser'; // 외부 브라우저 열기
import React from 'react';
import { Alert, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Supabase 클라이언트 import
import supabase from '../auth/supabase';

// Expo 웹 브라우저에서 OAuth 세션을 마무리하기 위한 함수
WebBrowser.maybeCompleteAuthSession();

// 디바이스 화면 크기 가져오기 (레이아웃 계산용)
const { width, height } = Dimensions.get('window');

export default function Login() {
  // OAuth 리디렉션 URI 생성
  // iOS Expo Go에서는 useProxy: true 필요, 실제 빌드(Android/iOS)에서는 false
  const redirectUri = makeRedirectUri({
    scheme: 'com.jangtang.eatda', // 앱 스킴 (개발/빌드 구분용)
    useProxy: false
    // useProxy: Expo Go 사용 시 true 필요 / 빌드에서는 false
  } as any);
  
  // 구글 OAuth 요청 설정
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Platform.select({
      ios: '932319827566-tllvuaojpism3c7v1g52q0b3fmmn46k7.apps.googleusercontent.com',
      android: '932319827566-gc93lgvvv58b4enf6ejq79slgkm9is42.apps.googleusercontent.com',
      web: '932319827566-qdc9vpp4p222au23tlfhbis763c73tp8.apps.googleusercontent.com',
    }), 
    redirectUri: redirectUri, // 위에서 생성한 redirectUri 사용
  });

  // 로그인 응답 처리 (구글 전용)
  React.useEffect(() => {
    if (response?.type === 'success') {
      // 로그인 성공 시 서버에서 발급한 id_token 추출
      const { id_token } = response.params;
      signInWithGoogle(id_token); // Supabase 로그인 처리 함수 호출
    }
  }, [response]);

  // Supabase 구글 로그인 함수
  const signInWithGoogle = async (idToken: string) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });
    if (error) {
      Alert.alert('로그인 실패', error.message);
    } else {
      console.log('구글 로그인 성공', data);
      Alert.alert('로그인 성공!', `환영합니다 ${data.user?.email}`);
    }
    const { data: sessionData } = await supabase.auth.getSession();
    console.log('현재 세션:', sessionData?.session);
  };

  

  // ✅ 카카오 로그인 함수 (수정됨)
  async function signInWithKakao() {
    try {
      const redirectUri = makeRedirectUri({
        scheme: 'com.jangtang.eatda',
        useProxy: false, // Expo Go 테스트 시 true 필요
      } as any);
  
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: { redirectTo: redirectUri },
      });
      if (error) {
        Alert.alert('로그인 실패', error.message);
        return;
      }
  
      // 카카오 로그인 브라우저 열기
      const result = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectUri);
      console.log('카카오 로그인 결과:', result);
  
      if (result.type === 'success' && result.url) {
        // 👉 URL fragment 파싱
        const url = new URL(result.url);
        const fragment = new URLSearchParams(url.hash.substring(1));
  
        const access_token = fragment.get('access_token');
        const refresh_token = fragment.get('refresh_token');
  
        if (access_token && refresh_token) {
          // 👉 세션 직접 저장
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
  
          if (sessionError) {
            Alert.alert('세션 저장 실패', sessionError.message);
            return;
          }
  
          console.log('현재 세션:', sessionData?.session);
          Alert.alert('로그인 성공', `환영합니다 ${sessionData?.session?.user?.email ?? ''}`);
        } else {
          Alert.alert('로그인 실패', '토큰을 가져올 수 없습니다.');
        }
      } else {
        Alert.alert('로그인 취소', '사용자가 로그인 과정을 취소했습니다.');
      }
    } catch (err: any) {
      console.error('Kakao 로그인 오류', err);
      Alert.alert('로그인 실패', err.message || '알 수 없는 오류');
    }
  }
  
  

  return (
    <View style={styles.container}>
      {/* 앱 이름 및 슬로건 */}
      <Text style={styles.txt}>Save Food{'\n'}Share Value</Text>
      <View style={{ marginVertical: height / 4.5 }} />

      {/* 구글 로그인 버튼 */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FFFFFF' }]}
        activeOpacity={0.9}
        onPress={() => promptAsync()} // 로그인 팝업 실행
      >
        <Image style={styles.logo} source={require('../../assets/images/google.png')} />
        <Text style={styles.buttonText}>구글 계정으로 계속하기</Text>
      </TouchableOpacity>

      {/* 카카오톡 로그인 버튼 */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FAE407' }]}
        activeOpacity={0.9}
        onPress={()=> signInWithKakao()}
      >
        <Image style={styles.logo} source={require('../../assets/images/kakao.png')} />
        <Text style={styles.buttonText}>카카오톡으로 계속하기</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: width / 12,
    backgroundColor: '#006AE6'
  },
  txt: { 
    fontSize: 40, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'left', 
    fontFamily: 'Inter-Bold', 
    marginTop: height / 7
  },
  button: { 
    width: width * 0.85, 
    height: 50, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
    marginVertical: 5, 
    flexDirection: 'row'
  },
  buttonText: { 
    color: 'black', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  logo: { 
    height: 24, 
    width: 24, 
    position: 'absolute', 
    left: 15
  },
});

