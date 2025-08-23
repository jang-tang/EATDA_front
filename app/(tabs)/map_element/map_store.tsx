// goods.tsx
import { API_BASE_URL } from '@/config';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductBoxProps {
  store_id:number;
  image: any;          // 이미지 소스 (require or uri)
  title: string;       // 상품명
  location: string;    // 도로명 주소
  tel: string;         // 전화번호
  onPress?: () => void; // 클릭 이벤트 (옵션)
}

async function get_maxSale(store_id : number) {
  try {
    const response = await fetch(`${API_BASE_URL}/stores/get_maxSale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "store_id": store_id
      }),
    });

    const data = await response.json();
    return data
  
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

export default function Map_store({ image, title, location, tel, store_id, onPress }: ProductBoxProps) {
  let [maxSale, setMaxSale] = useState(0);
  useEffect(()=>{
    const fetchStores = async ()=>{
      const data = await get_maxSale(store_id); // ✅ 기다린 후
      if (data){
        setMaxSale(data)
      }else if(data == 0){
        setMaxSale(data)
      }; 
    }
    fetchStores()
  },[title])
  
  
  return (
    <View style={styles.outerBox}>
      <TouchableOpacity 
        style={styles.container} 
        activeOpacity={0.9} 
        onPress={() => { router.push({
          pathname: '/elements/store_page',
          params: {
            store_id: String(store_id), // query는 문자열만 허용됨
            image:image,
            title:title,
            location:location,
            tel:tel,
          }
        })}}
      >
        <View style={styles.textContainer}>
          <Text style={styles.sale}>{maxSale}% off</Text>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          <Text style={styles.lo_tel} numberOfLines={1} ellipsizeMode="tail">{location}</Text>
          <Text style={styles.lo_tel} numberOfLines={1} ellipsizeMode="tail">{`Tel) ${tel}`}</Text>
        </View>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',  // 둥근 모서리가 이미지까지 잘 적용되도록
    marginHorizontal: 20,
    marginVertical: 10,
    width: '100%',
    height: 130,
  },
  container: {
    flexDirection: 'row',
    flex: 1,      
    margin: 10,
  },
  image: {
    width: 115,
    height: '100%',
    borderRadius: 10,
    marginVertical: 0,
    marginRight: 0
  },
  textContainer: {
    flex: 1,
    marginVertical: 5,
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    color: '#333',
    marginVertical: 5,
  },
  sale: {
    color: '#006AE6',
    marginRight: 10,
    fontSize: 15,
  },
  lo_tel: {
    color: '#A8A9AA',
    marginRight: 15,
    fontSize: 14,
  }
});
