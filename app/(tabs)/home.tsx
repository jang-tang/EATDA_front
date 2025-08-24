// Home.tsx
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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

export default function Home() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [product, setProduct] = useState<any[]>([]); // 서버에서 불러온 상품 목록

  // 검색어가 바뀔 때
  useEffect(() => {
    console.log("검색어가 바뀜:", searchWord);
    // 필요 시 API 호출 등 다른 작업 가능
  }, [searchWord]);

  // 상품 데이터 불러오기
  useEffect(() => {
    const fetchStores = async () => {
      const data = await Get_product(); 
      if (data) setProduct(data);
    };
    fetchStores();
  }, []);

  // 필터링된 상품
  const filteredProducts = product.filter((p) =>
    searchWord === '' ? true : p.title.toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Top searchWord={searchWord} setSearchWord={setSearchWord} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Ad_screen/>
        {filteredProducts.length === 0 ? (
          <Text style={styles.noProductText}>상품이 없어요</Text>
        ) : (
          filteredProducts.map((product, index) => (
            <View key={product.product_id}>
              {index !== 0 && <View style={styles.divider} />}
              <ProductBox
                key={product.product_id}
                image={product.image_url}
                title={product.title}
                price={product.original_price}
                sale={product.discount_price}
                description={product.description}
                hashtags={product.hashtags}
                extra_info={product.extra_info}
                product_id={product.product_id}
                store_id={product.store_id}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
    marginHorizontal: 20,
  },
  noProductText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
