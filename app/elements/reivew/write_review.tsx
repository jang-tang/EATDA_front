import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Sub_Top from "../sub_TopBar";

export default function Write() {
  const [rating, setRating] = useState(0); // 실제 평점
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => setShowPreview((prev) => !prev);

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((i) => {
      const fill = Math.min(Math.max(rating - (i - 1), 0), 1) * 100;
      return (
        <TouchableOpacity
          key={i}
          style={styles.starWrapper}
          onPress={() => setRating(i)}
          activeOpacity={0.7}
        >
          <Ionicons name="star" size={28} color="#D3D3D4" />
          <View style={[styles.starFill, { width: `${fill}%` }]}>
            <Ionicons name="star" size={28} color="#006AE6" />
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Sub_Top title="평점 및 리뷰" />

      {/* 가게명 + 상품명 */}
      <View style={styles.storeProductContainer}>
        <Text style={styles.storeName}>솔빛 베이커리</Text>
        <Ionicons name="chevron-forward" size={16} color="#999" style={{ marginHorizontal: 4 }} />
        <Text style={styles.productName}>단팥빵</Text>
      </View>

      <ScrollView style={styles.container}>
        {/* 별 선택 UI */}
        <View style={styles.ratingContainer}>{renderStars()}</View>

        <TextInput
          style={styles.contentInput}
          placeholder="내용을 입력하세요"
          placeholderTextColor="#999"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        {showPreview && (
          <View style={styles.previewContainer}>
            <View style={styles.imageBox} />
          </View>
        )}

        <TouchableOpacity style={styles.imageButton} activeOpacity={0.7} onPress={togglePreview}>
          <Ionicons name="camera-outline" size={28} color="#666" />
          <Text style={styles.imageText}>이미지 추가</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} activeOpacity={0.9} onPress={() => router.back()}>
          <Text style={styles.submitText}>등록</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  storeProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: "#f2f6ff",
    padding: 10,
    borderRadius: 8,
  },
  storeName: { fontSize: 16, fontWeight: "600", color: "#006AE6" },
  productName: { fontSize: 16, fontWeight: "500", color: "#333" },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 20,
  },
  starWrapper: { position: "relative", marginHorizontal: 2 },
  starFill: { position: "absolute", overflow: "hidden", top: 0, left: 0, height: "100%" },
  contentInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    height: 150,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 30,
  },
  imageText: { marginLeft: 8, fontSize: 15, color: "#666" },
  previewContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    alignItems: "flex-start",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  imageBox: { width: 120, height: 120, borderRadius: 10, backgroundColor: "#ddd" },
  submitButton: {
    backgroundColor: "#006AE6",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
