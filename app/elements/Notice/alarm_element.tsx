import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type NoticeProps = {
  title: string
  storeName: string;
  date: string; // ISO 문자열
  type :  '재고 알림' | '픽업 예약 알림' | '결제 알림' | string;
  OnPress?: () => void;
};

export default function Notice({ title, storeName, date, OnPress, type }: NoticeProps) {

  const getMessage = () => {
    switch (type) {
      case '결제 완료':
        return `안녕하세요, ${storeName}입니다. 결제가 완료되었습니다. 리뷰를 작성해보세요!`;
      case '픽업 예약':
        return `안녕하세요, ${storeName}입니다. 예약하신 픽업이 준비되었습니다! 매장을 방문해주세요.`;
      case '재고 알림':
        return `안녕하세요, ${storeName}입니다. ${title} 재고가 다시 들어왔어요! 어서 매장에서 만나보세요.`;
      default:
        return `안녕하세요, ${storeName}입니다. 새로운 알림이 있습니다.`;
    }
  };

  // title에 따라 아이콘 결정
  const getIconName = () => {
    switch (type) {
      case '재고 알림':
        return 'bell';
      case '픽업 예약':
        return 'shopping-bag';
      case '결제 완료':
        return 'credit-card';
      default:
        return 'bell';
    }
  };

  // date 포맷: 2025-08-24T09:01:06.000Z -> 25.08.24
  const formatDate = (isoDate?: string) => {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    const year = d.getFullYear() % 100; // 마지막 두 자리
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={OnPress}>
      <View style={styles.container}>
        {/* 상단 헤더: 아이콘 + 제목 + 날짜 */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Feather name={getIconName()} size={20} color="black" style={{ marginRight: 5 }} />
            <Text style={styles.titleText}>{type}</Text>
          </View>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </View>

        {/* 본문 텍스트 */}
        <Text style={styles.bodyText}>{getMessage()}</Text>
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
