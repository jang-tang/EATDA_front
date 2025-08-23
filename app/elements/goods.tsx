//goods.tsx
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductBoxProps {
  product_id:number;
  image: any;          // 이미지 소스 (require or uri)
  title: string;       // 상품명
  description?: string; // 간단한 설명 (옵션)
  sale: number;
  price: number;       // 가격 표시 (문자열로 처리)
  hashtags: string;
  extra_info:string;
  store_id:number;
  onPress?: () => void; // 클릭 이벤트 (옵션)
}

export default function ProductBox({ image, title, description, price, sale, onPress, hashtags, extra_info, product_id, store_id }: ProductBoxProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={()=>{router.push({
      pathname: '/elements/GoodsDetail/goods_detail',
      params: {
        store_id: store_id,
        product_id: product_id,
        title: title,
        price: price,
        sale: sale,
        description: description || '',
        hashtags: hashtags,
        extra_info: extra_info,
        image: typeof image === 'object' ? image.uri : image, // require일 경우 uri로 변환
      },
    })}}>
      <View style={styles.textContainer}>
        <Text style={styles.sale}>{Math.floor((1 - sale / price)* 100)}% off</Text>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {description ? <Text style={styles.description} numberOfLines={2}>{description}</Text> : null}
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.sale}>{sale}원</Text>
            <Text style={styles.price}>{price}원</Text>
        </View>
      </View>
      <Image source={{uri:image}} style={styles.image} resizeMode="cover" />
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
    borderRadius:10,
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
