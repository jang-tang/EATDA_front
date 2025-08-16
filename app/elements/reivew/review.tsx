import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Sub_Top from "../sub_TopBar";
import Score from "./average_score";
import R_component from "./review_component";

export default function Review() {
  return (
    <>
      <Sub_Top title="리뷰"/>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        <Score />
        <View style={styles.divider}></View>
        <R_component />
        <View style={styles.divider}></View>
        <R_component />
        <View style={styles.divider}></View>
        <R_component />
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
});
