import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');


export default function TopBtns() {
    return (
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.TopBtns}>
              {/* 왼쪽 버튼 그룹 */}
              <View style={styles.leftButtons}>
                <TouchableOpacity onPress={ () => router.back()} activeOpacity={0.9}><Icon name="arrow-back" size={26} color="white"/></TouchableOpacity>
              </View>
  
              {/* 오른쪽 버튼 그룹 */}
              <View style={styles.rightButtons}>
              <TouchableOpacity onPress={ () => router.back()} activeOpacity={0.9}><Icon style={styles.iconSpacing} name="share" size={24} color="white"  /></TouchableOpacity>
              <TouchableOpacity onPress={ () => router.back()} activeOpacity={0.9}><Icon name="search" size={30} color="white"/></TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    TopBtns: {
      width: width,
      flexDirection: "row",
      justifyContent: "space-between", // 양쪽 끝 정렬
      alignItems: "center",
      paddingHorizontal: 20, // 좌우 여백
    },
    leftButtons: {
      flexDirection: "row",
      alignItems: "center",
    },
    rightButtons: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconSpacing: {
      marginRight: 15, // 공유 아이콘과 검색 아이콘 사이 간격
    },
    safeArea: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });
  
