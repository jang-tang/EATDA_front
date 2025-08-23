import { API_BASE_URL } from "@/config";
import { router } from "expo-router"; // 화면 전환을 위한 라우터
import React, { useEffect, useState } from "react";
import {
  Dimensions, // 기기 화면 크기 가져오기
  Image, // 이미지 컴포넌트
  StyleSheet, // 스타일 시트 유틸리티
  Text, // 텍스트 컴포넌트
  TouchableOpacity, // 클릭 가능한 영역(버튼)
  View, // 레이아웃 컨테이너
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'; // 아이콘 라이브러리

// 기기 화면의 너비와 높이
const { width, height } = Dimensions.get('window');

// 원본 이미지의 크기
const originalWidth = 400;
const originalHeight = 300;

// 이미지 비율 유지용 스케일 계산
const scaleFactor = width / originalWidth;
const scaledHeight = originalHeight * scaleFactor;

interface StoreBoxProps {
  store_id:number;
  store_name:string;
  latitude:number;
  longitude:number;
  image_url:string  ;
}

async function Get_maxSale(store_id : number) {
  try {
    const response = await fetch(`${API_BASE_URL}/stores/get_maxSale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "store_id": store_id,
      }),
    });

    const data = await response.json();
    return data
  
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

export default function Store_intro({store_id, store_name, latitude, longitude, image_url} : StoreBoxProps) {
  const [maxSale, setmaxSale] = useState<number>(0); // ✅ 서버에서 불러온 가게 목록
    useEffect(()=>{
      const fetchStores = async ()=>{
        const data = await Get_maxSale(Number(store_id)); // ✅ 기다린 후
        if (data){
          setmaxSale(data)
        }; 
      }
      fetchStores()
    },[])
    return (
        <View style={styles.store_info}>
          
          {/* 왼쪽: 가게 이미지 + 텍스트 정보 */}
          <View style={styles.store_imgandinfo}>
            {/* 가게 대표 이미지 */}
            <Image 
              style={styles.store_img} 
              source={{uri:image_url}} 
            />
            {/* 가게 이름과 할인 정보 */}
            <View style={styles.txt_box}>
              <Text style={styles.txt_head}>{store_name}</Text>
              <Text style={styles.txt_sub}>최대 {maxSale}% off</Text>
            </View>
          </View>

          {/* 오른쪽: "지도로 보기" 버튼 */}
          <TouchableOpacity 
            style={styles.txt_map} 
            activeOpacity={0.9} // 눌렀을 때 살짝 투명해짐
            onPress={() => { router.push('/map'); }} // 지도 페이지로 이동
          >
            <Text>지도로 보기</Text>
            {/* 오른쪽 화살표 아이콘 */}
            <Entypo name="chevron-right" size={17}/>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    // 가게 이름과 할인정보를 담는 박스
    txt_box: {
      marginLeft: 10, // 이미지와 텍스트 사이 간격
    },
    // 가게 이름 스타일
    txt_head: {
      marginBottom: 2,
      fontWeight: "700", // 굵게
    },
    // 할인 정보 스타일
    txt_sub: {
      marginTop: 2,
      color: "#006AE6", // 파란색 강조
    },
    // "지도로 보기" 버튼 텍스트+아이콘
    txt_map: {
      flexDirection: "row", // 텍스트와 아이콘 가로 배치
      marginTop: 4,
      marginRight: 5,
    },
    // 이미지와 텍스트 정보를 가로로 배치
    store_imgandinfo: {
      flexDirection: "row",
      alignItems: "center", // 세로 중앙 정렬
    },
    // 가게 이미지 스타일
    store_img: {
      borderTopLeftRadius: 10,    // 왼쪽 위 모서리 둥글게
      borderBottomLeftRadius: 10, // 왼쪽 아래 모서리 둥글게
      width: width / 7,           // 기기 화면 너비의 1/7 크기
      height: width / 7           // 정사각형
      // TODO: 그림 비율 유지 및 borderRadius 반대쪽 적용 가능
    },
    // 전체 가게 소개 영역 스타일
    store_info: {
      flexDirection: "row",            // 왼쪽(이미지+정보) & 오른쪽(버튼) 가로 배치
      justifyContent: "space-between", // 양쪽 끝 정렬
      margin: 15,                       // 바깥 여백
    },
});
