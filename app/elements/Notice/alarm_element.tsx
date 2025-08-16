import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Notice({ title = '결제 알림', bakeryName = '솔빛베이커리', date = '25.08.07', OnPress = ()=> {router.push('/elements/reivew/write_review')}}) {

  // title에 따라 아이콘 결정
  const getIconName = () => {
    switch (title) {
      case '재고 알림':
        return 'bell';
      case '픽업 예약 알림':
        return 'shopping-bag';
      case '결제 알림':
        return 'credit-card';
      default:
        return 'bell';
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={OnPress}>
    <View style={styles.container}>
      {/* 상단 헤더: 아이콘 + 제목 + 날짜 */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Feather name={getIconName()} size={20} color="black" style={{ marginRight: 5 }} />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <Text style={styles.dateText}>{date}</Text>
      </View>

      {/* 본문 텍스트 */}
      <Text style={styles.bodyText}>
        안녕하세요 <Text style={styles.bakeryName}>{bakeryName}</Text>입니다.{'\n'}
        어서 가서 따뜻한 단팥빵을 만나보세요. 기다릴게요.
      </Text>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
  bakeryName: {
    color: '#006AE6',
    fontWeight: 'bold',
  },
  
});
