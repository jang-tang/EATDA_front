import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Score() {
  const ratings = [
    { score: 5, count: 170 },
    { score: 4, count: 60 },
    { score: 3, count: 30 },
    { score: 2, count: 20 },
    { score: 1, count: 6 },
  ];

  const totalCount = ratings.reduce((sum, r) => sum + r.count, 0);

  // 평균 평점 계산
  const averageRating =
    totalCount > 0
      ? ratings.reduce((sum, r) => sum + r.score * r.count, 0) / totalCount
      : 0;

  return (
    <View style={styles.container}>
      {/* 왼쪽 영역: 평균 평점 + 별 */}
      <View style={styles.left}>
        <Text style={styles.average}>{averageRating.toFixed(1)}</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => {
            const fill = Math.min(Math.max(averageRating - (i - 1), 0), 1); // 0~1
            return (
              <View key={i} style={styles.starWrapper}>
                <Ionicons name="star" size={15} color="#D3D3D4" />
                <View
                  style={[
                    styles.starFill,
                    { width: `${fill * 100}%` },
                  ]}
                >
                  <Ionicons name="star" size={15} color="#006AE6" />
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* 오른쪽 영역: 평점별 막대 */}
      <View style={styles.right}>
        {ratings.map((r) => {
          const widthPercent = totalCount ? (r.count / totalCount) * 100 : 0;
          return (
            <View key={r.score} style={styles.row}>
              <Text style={styles.scoreText}>{r.score}점</Text>
              <View style={styles.barContainer}>
                <View style={styles.barBackground} />
                <View
                  style={[
                    styles.barFill,
                    { width: `${widthPercent}%` },
                  ]}
                  onLayout={(e) => {
                    const w = e.nativeEvent.layout.width;
                    e.target.setNativeProps({
                      style: { borderRadius: Math.min(6, w / 2) },
                    });
                  }}
                />
              </View>
              <Text style={styles.countText}>{r.count}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
  },
  left: {
    alignItems: "center",
    marginRight: 30,
  },
  average: {
    fontSize: 32,
    fontWeight: "600",
  },
  stars: {
    flexDirection: "row",
    marginTop: 5,
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
  right: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    justifyContent: "space-between", // ← 추가: 막대와 텍스트 사이 공간 확보
  },
  scoreText: {
    width: 30,
    fontSize: 14,
  },
  barContainer: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 10,
    overflow: "hidden",
    backgroundColor: "#D3D3D4",
  },
  barBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#D3D3D4",
  },
  barFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#006AE6",
  },
  countText: {
    width: 30,
    fontSize: 12,
    textAlign: "left", // ← 오른쪽 정렬
  },
});
