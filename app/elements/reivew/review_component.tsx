import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function R_component() {
  const nickname = "jang-tang";
  const rating = 4.3; // 여기서 별점 숫자 변경 가능
  const date = "25.08.25";
  const reviewText = "한 입 먹자마자 눈물이 핑 돌았어요.  치즈는 늘어지고 빵은 구름처럼 부드럽고, 야채는 방금 정원에서 따온 듯 신선했어요.이건 그냥 샌드위치가 아니라… 행복입니다.";

  return (
    <View style={styles.container}>
      {/* 닉네임 */}
      <Text style={styles.nickname}>{nickname}</Text>

      {/* 별 + 날짜 */}
      <View style={styles.starRow}>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => {
            const fill = Math.min(Math.max(rating - (i - 1), 0), 1); // 0~1
            return (
              <View key={i} style={styles.starWrapper}>
                <Ionicons name="star" size={20} color="#D3D3D4" />
                <View style={[styles.starFill, { width: `${fill * 100}%` }]}>
                  <Ionicons name="star" size={20} color="#006AE6" />
                </View>
              </View>
            );
          })}
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* 이미지 */}
      <Image source={require('../../../assets/images/sandwich.png')} style={styles.image} />

      {/* 리뷰 텍스트 */}
      <Text style={styles.reviewText}>{reviewText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "white",
  },
  nickname: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stars: {
    flexDirection: "row",
    marginRight: 10,
  },
  starWrapper: {
    position: "relative",
    marginHorizontal: 1,
  },
  starFill: {
    position: "absolute",
    overflow: "hidden",
    top: 0,
    left: 0,
    height: "100%",
  },
  date: {
    color: "#A0A0A0",
    fontSize: 12,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 6,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 18,
  },
});
