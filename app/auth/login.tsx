// app/auth/login.tsx
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        Save Food{'\n'}Share Value
      </Text>
      <View style={{marginVertical : height / 4.5}}></View>
      <TouchableOpacity style={[styles.button, {backgroundColor : '#FFFFFF'}]} activeOpacity={0.9}>
        <Image style={styles.logo} source={require('../../assets/images/google.png')}></Image>
        <Text style={styles.buttonText}>구글 계정으로 계속하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor : '#FAE407'}]} activeOpacity={0.9}>
      <Image style={styles.logo} source={require('../../assets/images/kakao.png')}></Image>
        <Text style={styles.buttonText}>카카오톡으로 계속하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingHorizontal: width / 12,
        backgroundColor: '#006AE6'
    },
    txt : {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
        textAlign: "left",
        fontFamily: "Inter-Bold",
        marginTop : height / 7,
    },
    button: {
        width: width * 0.85, // 화면 너비의 85% 사용
        height: 50,
        borderRadius: 12, // 라운딩
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // 가운데 정렬
        marginVertical: 5,
        flexDirection: 'row',
      },
      buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
      },
      logo : {
        height : 24,
        width : 24,
        position: 'absolute',
        left : 15
      }
})



