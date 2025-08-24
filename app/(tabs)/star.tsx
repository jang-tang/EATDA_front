import { API_BASE_URL } from '@/config';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
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
  const [searchWord, setSearchWord] = useState<string>('');
  const [stores, setStores] = useState<any[]>([]);

  // 매장 데이터 불러오기
  useEffect(() => {
    const fetchStores = async () => {
      const data = await Get_stores(); 
      if (data) setStores(data);
    };
    fetchStores();
  }, []);

  // 검색어로 필터링
  const filteredStores = stores.filter((store) =>
    searchWord === '' ? true : store.store_name.toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <>
      <Top searchWord={searchWord} setSearchWord={setSearchWord} />
      <ScrollView style={styles.container}>
        <View style={styles.head_con}>
          <Text style={styles.headline}>관심 브랜드</Text>
          <View style={styles.sortContainer}>
            <Text style={styles.sort_name}>인기순</Text>
            <Entypo name="list" size={20} style={styles.icon} />
          </View>
        </View>

        {filteredStores.length === 0 ? (
          <Text style={styles.noStoreText}>매장이 없어요</Text>
        ) : (
          filteredStores.map((store) => (
            <Star_store
              key={store.store_id}
              store_id={store.store_id} 
              store_name={store.store_name} 
              latitude={store.latitude} 
              longitude={store.longitude} 
              image_url={store.image_url} 
              road_address={store.road_address} 
              phone_number={store.phone_number}
              maxSale={store.mx}                
            />
          ))
        )}
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
  container:{
    backgroundColor: "#FFFFFF",
    flex: 1, 
  },
  head_con :{
    flexDirection:"row",
    justifyContent: 'space-between',
    marginTop:20,
    marginHorizontal:20,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
    color:"grey"
  },
  noStoreText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  }
});
