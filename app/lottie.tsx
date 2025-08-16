// app/lottie.tsx
import React from 'react';
import { View,Image, Text,StyleSheet } from 'react-native';

export default function Lottie() {
  return (
    
  <View style={styles.container}>
    <Image style={styles.Img} source={require('../assets/images/EATDA_LOGO.png')}></Image>
    <Text style={styles.Name}>남김없는 연결을, 잇다</Text>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006AE6',
    justifyContent: 'center', //수직 가운데 정렬
    alignItems: 'center' // 수평 가운데 정렬
  },
  Name : {
    color: '#fff',               
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 80
  },
  Img : {
    height : 120,
    width : 120,
    marginBottom: 5
  },
});
