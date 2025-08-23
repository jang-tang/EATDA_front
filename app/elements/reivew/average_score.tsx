import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface ScoreProps {
  rating: number[]; // 1~5의 평점이 들어있는 배열
}

interface Ratings {
  ratingAndCount: {
    score: number;
    count: number;
  }
}

export default function Score({ rating }: ScoreProps) {
  const [ratings, setRatings] = useState<Ratings[]>([]);
const [totalCount, setTotalCount] = useState<number>(0);
const [averageRating, setAverageRating] = useState<number>(0);

useEffect(() => {
  // 1~5 점 카운트 계산
  const computedRatings: Ratings[] = [1, 2, 3, 4, 5].map((score) => ({
    ratingAndCount: {
      score,
      count: rating.filter((r) => r === score).length,
    },
  })).reverse(); // UI상 5점이 위로 오게

  setRatings(computedRatings);

  // totalCount 계산
  const total = computedRatings.reduce((sum, r) => sum + r.ratingAndCount.count, 0);
  setTotalCount(total);

  // 평균 평점 계산
  const average =
    total > 0
      ? computedRatings.reduce((sum, r) => sum + r.ratingAndCount.score * r.ratingAndCount.count, 0) / total
      : 0;
  setAverageRating(average);
  

}, [rating]);

  

  return (
    <View style={styles.container}>
      {/* 왼쪽 영역: 평균 평점 + 별 */}
      <View style={styles.left}>
        <Text style={styles.average}>{averageRating.toFixed(1)}</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => {
            const fill = Math.min(Math.max(averageRating - (i - 1), 0), 1);
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
          const widthPercent = totalCount ? (r.ratingAndCount.count / totalCount) * 100 : 0;
          return (
            <View key={r.ratingAndCount.score} style={styles.row}>
              <Text style={styles.scoreText}>{r.ratingAndCount.score}점</Text>
              <View style={styles.barContainer}>
                <View style={styles.barBackground} />
                <View
                  style={[
                    styles.barFill,
                    { width: `${widthPercent}%` },
                  ]}
                />
              </View>
              <Text style={styles.countText}>{r.ratingAndCount.count}</Text>
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
    justifyContent: "space-between",
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
    textAlign: "left",
  },
});
