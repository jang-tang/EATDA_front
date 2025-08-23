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
    const response = await fetch(`${API_BASE_URL}/products`, {
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
    console.log(product)
    fetchStores()
  },[])
  //제품 가져와서 나열할 차례
  
  return (
    <>
    <SafeAreaView style={styles.safeArea}>
      <Top />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <Ad_screen/>
        {product.map((product, index)=>(
          <View key={product.product_id}>
            {index !== 0 && <View style={styles.divider} />}
            <ProductBox key={product.product_id} image={product.image_url} title={product.title} price={product.original_price} sale={product.discount_price} description={product.description} hashtags={product.hashtags} extra_info={product.extra_info} product_id={product.product_id} store_id={product.store_id} />
          </View>
        ))}
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
