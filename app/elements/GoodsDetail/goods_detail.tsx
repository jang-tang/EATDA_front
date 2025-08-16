import React from "react";
import {
  Dimensions, // 기기 화면의 너비와 높이 가져오기
  ImageBackground, // 배경 이미지를 표시할 수 있는 컴포넌트
  Platform, // 현재 플랫폼(iOS / Android) 식별
  StatusBar, // 상태바 높이 정보 가져오기
  StyleSheet, // 스타일 정의 유틸리티
  View // 레이아웃 컨테이너
} from "react-native";

// 화면 하단에 표시될 컴포넌트들 import
import Bottom_Bar from "./BottomBar";
import Store_detail from './store_detail'; // 가게 상세 정보
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

export default function Detail() {
    return (
      <View style={styles.big_container}>
        <View>
        {/* 상단 상품 이미지를 배경으로 사용 */}
        <ImageBackground 
          source={require('../../../assets/images/RedBeanBread.png')} 
          style={styles.GoodsImg}
        >
          {/* 이미지 위에 상단 버튼 배치 */}
          <TopBtns/>
        </ImageBackground>

        {/* 가게 소개 섹션 */}
        <Store_intro/>

        {/* 구분선 */}
        <View style={styles.divider}/>

        {/* 가게 상세 정보 섹션 */}
        <Store_detail/>
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
