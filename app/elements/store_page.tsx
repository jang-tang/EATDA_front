import { API_BASE_URL } from '@/config';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductBox from '../elements/goods';
import Stroe_Top from '../elements/store_top';
import Score from './reivew/average_score';
import R_component from './reivew/review_component';

async function Get_reviewsOfStore(store_id : number) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/allOfStore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "store_id": store_id
      }),
    });

    const data = await response.json();
    return data;
  
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

async function Get_product_in_Store(store_id : number) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/products_in_store`, {
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

interface ProductBoxProps {
  product_id: number
  store_id: number     
  title: string        
  description:string 
  extra_info: string
  hashtags: string
  original_price: number
  discount_price: number
  image_url: string
}

export default function Page_of_store() {
  const { store_id, title, image, location, tel } = useLocalSearchParams<{
    store_id: string;
    image: string;
    title: string;
    location: string;
    tel: string;
  }>();

  let [reivews, setReviews] = useState<any[]>([]);
  const [maxsale,setMaxSale] = useState(0);
  const [selectedTab, setSelectedTab] = useState('재고보기');
  const [products, setProducts] = useState<ProductBoxProps[]>([]); // ✅ 서버에서 불러온 가게 목록
  let [rating, setRating] = useState<number[]>([]);
  useEffect(() => {
    const fetchRivews = async ()=>{
      const data = await Get_reviewsOfStore(Number(store_id));
      if (data){
        setReviews(data);

        const ratingsArray = data.map((review: any) => review.rating);
        setRating(ratingsArray);
      }; 
    };
    const fetchStores = async () => {
      const data = await Get_product_in_Store(Number(store_id));
      if (data && data.length > 0) {
        setProducts(data);
  
        // 최대 할인율 계산
        const maxSaleValue = data.reduce((max: number, product: { discount_price: number; original_price: number; }) => {
          const salePercent = Math.floor(
            (1 - product.discount_price / product.original_price) * 100
          );
          return salePercent > max ? salePercent : max;
        }, 0);
  
        setMaxSale(maxSaleValue);
      }
    };
  
    fetchRivews()
    fetchStores();
  }, []);

  return (
    <View style={styles.container}>
      {/* 고정 TopBar */}
      <Stroe_Top />

      {/* 스크롤 영역 */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* 헤드 부분 */}
          <View style={styles.head_container}>
            <Text style={styles.sale}>최대 {maxsale}% 할인</Text>
            <View style={styles.headline}>
              <Text style={styles.head}>{title}</Text>
              <View style={styles.des_container}>
                <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">{location}</Text>
                <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">{`Tel) ${tel}`}</Text>
              </View>
            </View>
          </View>

          {/* 선택 바 */}
          <View style={styles.selectBar}>
            {['재고보기', '평점 및 리뷰'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={[
                  styles.tabItem,
                  selectedTab === tab && styles.tabItemSelected,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.tabTextSelected,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 선택에 따른 내용 */}
          {selectedTab === '재고보기' && (
          products.length === 0 ? (<Text style={styles.noProducts}>재고가 없어요</Text>) 
          :products.map((product, index) => (
            <React.Fragment key={product.product_id}>
              {index !== 0 && <View style={styles.divider_half}></View>}
              <ProductBox 
                product_id={product.product_id} 
                image={product.image_url} 
                title={product.title} 
                sale={product.discount_price} 
                description={product.description}
                price={product.original_price} 
                hashtags={product.hashtags} 
                extra_info={product.extra_info} 
                store_id={product.store_id}                
              />
            </React.Fragment>
          )))}

          {selectedTab === '평점 및 리뷰' && (
          <View style={styles.review_con}>
            <Score rating={rating} />

            {reivews.length === 0 ? (<Text style={styles.noReview}>리뷰가 없어요</Text>) 
            : (reivews.map((review) => (
                <View key={review.review_id}>
                <View style={styles.divider}></View>
                <R_component
                  review_id={review.review_id}
                  user_id={review.user_id}
                  product_id={review.product_id}
                  rating={review.rating}
                  created_at={review.created_at}
                  image_url={review.image_url}
                  content={review.content}
                />
                </View>
                ))
              )}
              </View>
              )}

              </View>
              </ScrollView>
            </View>
            );}

const styles = StyleSheet.create({
  noReview: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
  noProducts: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
  review_con:{
    padding: 25
  },
  scrollContent: {
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
    marginVertical: 15,
  },
  divider_half: {
    height: 1,
    backgroundColor: '#D3D3D4',
    marginHorizontal: 25,
    marginVertical: 10,
  },
  selectBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabItem: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemSelected: {
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
  },
  tabTextSelected: {
    color: 'black',
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sale: {
    fontSize: 16,
    color: '#006AE6',
    marginTop: 10,
  },
  content: {
    marginVertical: 20,
  },
  head_container: {
    marginHorizontal: 20,
  },
  headline: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  head: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    color: '#A7A7A7',
  },
  des_container: {
    flex: 1,
    marginLeft: 10,
  },
});
