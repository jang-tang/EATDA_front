import { API_BASE_URL } from "@/config";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface ReviewBox {
  review_id:number,
  user_id:number, 
  product_id:number, 
  rating:number,    
  created_at: string,
  image_url: string,
  content:string
}
async function Get_username(user_id : number) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/get_name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": user_id,
      }),
    });

    const data = await response.json();
    return data
  
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

// 날짜 포맷 함수
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear().toString().slice(2); // 뒤 2자리
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export default function R_component({review_id,user_id,product_id,rating,created_at,image_url,content}:ReviewBox) {
  let [username, setUsername] = useState<string>('')
  let [date, setDate] = useState<string>('');

  useEffect(()=>{
    const fetchStores = async ()=>{
      const data = await Get_username(Number(user_id)); // ✅ 기다린 후
      if (data){
        setUsername(data)
      }; 
    }
    fetchStores()
    let D = formatDate(created_at)
    setDate(D);
  },[])
  return (
    <View style={styles.container}>
      {/* 닉네임 */}
      <Text style={styles.nickname}>{username}</Text>

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
      <Image source={{uri:image_url}} style={styles.image} />

      {/* 리뷰 텍스트 */}
      <Text style={styles.reviewText}>{content}</Text>
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
