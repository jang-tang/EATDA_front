import { API_BASE_URL } from '@/config';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'; // 아이콘 임포트
import Top from '../elements/Topbar';
import Star_store from './start_element/star_store';

const { width, height } = Dimensions.get('window');
async function Get_stores() {
  try {
    const response = await fetch(`${API_BASE_URL}/stores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    return data
  
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

export default function Star() {
  const [stores, setStores] = useState<any[]>([]); // ✅ 서버에서 불러온 가게 목록
  useEffect(()=>{
    const fetchStores = async ()=>{
      const data = await Get_stores(); // ✅ 기다린 후
      if (data){
        setStores(data)
      }; 
    }
    fetchStores()
  },[])
  return (
    <>
      <Top/>
      {/* 헤드 + 매장들을 ScrollView로 감싸기 */}
      <ScrollView style={styles.container}>
        <View style={styles.head_con}>
          <Text style={styles.headline}>관심 브랜드</Text>
          <View style={styles.sortContainer}>
            <Text style={styles.sort_name}>인기순</Text>
            <Entypo name="list" size={20} style={styles.icon} />
          </View>
        </View>
        {stores.map((store)=>(
          <Star_store 
          key={store.store_id}
          image={store.image_url}
          title={store.store_name}
          location={store.road_address}
          tel={`Tel) ${store.phone_number}`} 
          sale={50}          
        />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sort_name:{
    fontSize:14,
    color:"grey",
  },
  headline:{
    fontSize:20,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
  },
  divider_half: {
    height: 1,
    backgroundColor: '#D3D3D4',
    marginHorizontal: 25
  },
  container:{
    backgroundColor: "#FFFFFF",
    flex: 1, 
  },
  head_con :{
    flexDirection:"row",
    justifyContent: 'space-between',  // 양쪽 끝 정렬
    marginTop:20,
    marginHorizontal:20,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // 텍스트와 아이콘 수직 가운데 정렬
  },
  icon: {
    marginLeft: 5,
    color:"grey"
  }
});
