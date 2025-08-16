import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Sub_Top({title = '프로필'}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* 뒤로가기 아이콘 */}
        <TouchableOpacity onPress={()=>{router.back()}}>
            <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        {/* 중앙 텍스트 */}
        <Text style={styles.headerTitle}>{title}</Text>

        {/* 오른쪽 빈 공간 (정렬용) */}
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.divider} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
  },
});

  
