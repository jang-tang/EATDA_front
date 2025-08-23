import React, { useEffect, useState } from "react";
import {
  Dimensions, // 기기 화면의 너비와 높이 가져오기
  ImageBackground, // 배경 이미지를 표시할 수 있는 컴포넌트
  Platform, // 현재 플랫폼(iOS / Android) 식별
  StatusBar, // 상태바 높이 정보 가져오기
  StyleSheet, // 스타일 정의 유틸리티
  View // 레이아웃 컨테이너
} from "react-native";

// 화면 하단에 표시될 컴포넌트들 import
import { API_BASE_URL } from "@/config";
import { useLocalSearchParams } from 'expo-router';
import Bottom_Bar from "./BottomBar";
import Detail_txt from './store_detail'; // 가게 상세 정보
import Store_intro from './store_info'; // 가게 소개
import TopBtns from './topsbtns'; // 상단 버튼 영역
// 현재 기기의 화면 너비와 높이 가져오기
const { width, height } = Dimensions.get('window');

// 원본 이미지의 크기(픽셀) — 이 비율을 기준으로 반응형 조정
const originalWidth = 400;
const originalHeight = 300;

// 기기 화면 너비 대비 이미지 스케일 비율 계산
const scaleFactor = width / originalWidth;
const scaledHeight = originalHeight * scaleFactor; // 세로 비율 유지

async function Get_store(product_id : number) {
  try {
    const response = await fetch(`${API_BASE_URL}/stores/store_in_product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "product_id": product_id
      }),
    });

    const data = await response.json();
    return data
  
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

interface Store {
  store_id: number;
  store_name: string;
  latitude: number;
  longitude: number;
  image_url: string;
}


export default function Detail() {
  const { title, price, sale, description, hashtags, extra_info, image, product_id, store_id } =
    useLocalSearchParams<{
      title: string;
      price: string;
      sale: string;
      description?: string;
      hashtags: string;
      extra_info: string;
      image: string;
      product_id:string;
      store_id:string;
    }>();

    const [store, setStores] = useState<Store|null>(null); // ✅ 서버에서 불러온 가게 목록
    useEffect(()=>{
      const fetchStores = async ()=>{
        const data = await Get_store(Number(product_id)); // ✅ 기다린 후
        if (data){
          setStores(data)
        }; 
      }
      fetchStores()
    },[])
    return (
      <View style={styles.big_container}>
        <View>
        {/* 상단 상품 이미지를 배경으로 사용 */}
        <ImageBackground 
          source={{uri:image}} 
          style={styles.GoodsImg}
        >
        {/* 이미지 위에 상단 버튼 배치 */}
        <TopBtns/>
        </ImageBackground>

        {/* 가게 소개 섹션 */}
        {store && (
        <Store_intro 
          store_id={store.store_id} 
          store_name={store.store_name} 
          latitude={store.latitude} 
          longitude={store.longitude} 
          image_url={store.image_url}
        />
        )}

        {/* 구분선 */}
        <View style={styles.divider}/>

        {/* 가게 상세 정보 섹션*/}
        <Detail_txt product_id={product_id} image={image} title={title} sale={sale} price={price} hashtags={hashtags} extra_info={extra_info} store_id={store_id}/>
        </View>
        <Bottom_Bar/>
      </View>
    );
}
  
const styles = StyleSheet.create({
    big_container: { 
      flex: 1, 
      justifyContent: "space-between",
       backgroundColor: "#fff" 
      },
    // 회색 얇은 선 (구분선 역할)
    divider: {
      height: 1,
      backgroundColor: '#D3D3D4',
    },
    // 상품 이미지 영역 스타일
    GoodsImg: {
      width: width,        // 화면 가로 전체 차지
      height: scaledHeight, // 반응형 세로 높이
      alignItems: "center", // 내부 컴포넌트를 가로 중앙 정렬
    },
    // 상단 버튼 컨테이너 스타일
    TopBtns: {
      width: width,
      flexDirection: "row",          // 가로 배치
      justifyContent: "space-between", // 양쪽 끝으로 정렬
      alignItems: "center",           // 세로 중앙 정렬
      paddingHorizontal: 20,          // 좌우 여백
    },
    // 왼쪽 버튼 영역
    leftButtons: {
      flexDirection: "row",
      alignItems: "center",
    },
    // 오른쪽 버튼 영역
    rightButtons: {
      flexDirection: "row",
      alignItems: "center",
    },
    // 아이콘 사이 간격
    iconSpacing: {
      marginRight: 15, // 오른쪽 여백
    },
    // 상태바 높이만큼 패딩 주기 (안드로이드에서만 적용)
    safeArea: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
