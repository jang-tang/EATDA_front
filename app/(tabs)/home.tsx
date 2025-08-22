// Home.tsx  
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { API_BASE_URL } from '@/config';
import { useEffect, useState } from 'react';
import Ad_screen from '../elements/Ad_screen';
import Top from '../elements/Topbar';
import ProductBox from '../elements/goods';
const { width } = Dimensions.get('window');

async function Get_product() {
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

export default function Home(){
  const [product, setProduct] = useState<any[]>([]); // ✅ 서버에서 불러온 가게 목록
  useEffect(()=>{
    const fetchStores = async ()=>{
      const data = await Get_product(); // ✅ 기다린 후
      if (data){
        setProduct(data)
      }; 
    }
    fetchStores()
  },[])
  //제품 가져와서 나열할 차례
  
  return (
    <>
    <SafeAreaView style={styles.safeArea}>
      <Top />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <Ad_screen/>
        <ProductBox image={require('../../assets/images/bread.png')} title={'식빵'} price={4500} sale={2700} description={'보관기간 1일'} />
        <View style={styles.divider}/>
        <ProductBox image={require('../../assets/images/blueberry.png')} title={'블루베리'} price={5800} sale={4350} description={'보관기간 2일'} />
        <View style={styles.divider} />
        <ProductBox image={require('../../assets/images/onion.png')} title={'양파'} price={1580} sale={1100} description={'보관기간 5일'} />
        <View style={styles.divider}/>
        <ProductBox image={require('../../assets/images/bread.png')} title={'식빵'} price={4500} sale={2700} description={'보관기간 1일'} />
      </ScrollView>
    </SafeAreaView>
    </>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
    marginHorizontal: 20,
  },
});
