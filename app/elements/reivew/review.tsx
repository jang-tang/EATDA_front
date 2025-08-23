import { API_BASE_URL } from "@/config";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Sub_Top from "../sub_TopBar";
import Score from "./average_score";
import R_component from "./review_component";

async function Get_reviews(product_id : number) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "product_id": product_id
      }),
    });

    const data = await response.json();
    return data;
  
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

export default function Review() {
  const { product_id } = useLocalSearchParams<{ product_id: string }>();
  let [reivews, setReviews] = useState<any[]>([]);
  let [rating, setRating] = useState<number[]>([]);

  useEffect(()=>{
    const fetchStores = async ()=>{
      const data = await Get_reviews(Number(product_id)); 
      if (data){
        setReviews(data);

        const ratingsArray = data.map((review: any) => review.rating);
        setRating(ratingsArray);
      }; 
    };
    fetchStores();
  },[]);

  return (
    <>
      <Sub_Top title="리뷰"/>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        <Score rating={rating} />
        
        {reivews.length === 0 ? (
          <Text style={styles.noReview}>리뷰가 없어요</Text>
        ) : (
          reivews.map((review)=>(
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
    marginVertical: 15,
  },
  noReview: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});
