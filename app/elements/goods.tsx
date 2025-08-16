//goods.tsx
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductBoxProps {
  image: any;          // 이미지 소스 (require or uri)
  title: string;       // 상품명
  description?: string; // 간단한 설명 (옵션)
  sale: number;
  price: number;       // 가격 표시 (문자열로 처리)
  onPress?: () => void; // 클릭 이벤트 (옵션)
}

export default function ProductBox({ image, title, description, price, sale, onPress }: ProductBoxProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={()=>{router.push('/elements/GoodsDetail/goods_detail')}}>
      <View style={styles.textContainer}>
        <Text style={styles.sale}>{Math.floor((1 - sale / price)* 100)}% off</Text>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {description ? <Text style={styles.description} numberOfLines={2}>{description}</Text> : null}
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.sale}>{sale}원</Text>
            <Text style={styles.price}>{price}원</Text>
        </View>
      </View>
      <Image source={image} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20,
  },
  image: {
    width: 115,
    height: 115,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  textContainer: {
    flex: 1,
    marginVertical: 13,
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#666666',
    marginTop: 3,
  },
  sale: {
    color: '#006AE6',
    marginRight: 10,
    fontSize: 15,
  },
  price: {
    color: '#A8A9AA',
    marginRight: 15,
    textDecorationLine: 'line-through',
    fontSize: 15,
  },
});
