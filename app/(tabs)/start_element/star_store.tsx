import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface StoreBoxProps {
    image: any;          // 이미지 소스 (require or uri)
    title: string;       // 상품명
    tel: string; // 간단한 설명 (옵션)
    location: string;     // 가격 표시 (문자열로 처리)
    sale: number;
  }

export default function Star_storeProductBox({ image, title, location, tel, sale }: StoreBoxProps) {
  return (
      <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={()=> router.push('/elements/store_page')}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.sale}>최대 {sale}% 할일</Text>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.tel}>{tel}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20,
    height: 110,
    marginVertical: 20,
  },
  image: {
    width: 110,
    height: 110,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 10,
  },
  textContainer: {
    marginVertical: 13,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 5,
    color: '#333',
  },
  sale: {
    color: '#006AE6',
    fontSize: 15,
  },
  tel: {
    fontSize: 15,
    color: '#666666',
    marginTop: 3,
  },
  location: {
    fontSize: 15,
    color: '#666666',
    marginTop: 10,
  },
});