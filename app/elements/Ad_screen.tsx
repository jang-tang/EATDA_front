// Ad.tsx
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const originalWidth = 400;
const originalHeight = 270;

const scaleFactor = width / originalWidth;
const scaledHeight = originalHeight * scaleFactor;

// 실제 이미지들
const IMAGES = [
  require('../../assets/images/Ad_screen1.png'),
  require('../../assets/images/Ad_screen2.png'),
  require('../../assets/images/Ad_screen3.png'),
];

// 루프용: 앞뒤에 복사본 추가
const DATA = [IMAGES[IMAGES.length - 1], ...IMAGES, IMAGES[0]];

export default function Ad_screen(){
  // FlatList ref (null 허용)
  const listRef = useRef<FlatList<any> | null>(null);
  // 현재 보여지는 인덱스(루프 데이터 기준). 실제 첫 이미지는 DATA의 index 1
  const [index, setIndex] = useState<number>(1);

  // 스크롤 끝났을 때 (페이징 단위로 계산)
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    // 복사된 앞(0)에 도달하면 실제 마지막으로 무음 점프
    if (page === 0) {
      listRef.current?.scrollToIndex({ index: IMAGES.length, animated: false });
      setIndex(IMAGES.length);
      return;
    }
    // 복사된 뒤(DATA.length - 1)에 도달하면 실제 첫(1)으로 무음 점프
    if (page === DATA.length - 1) {
      listRef.current?.scrollToIndex({ index: 1, animated: false });
      setIndex(1);
      return;
    }
    // 일반 인덱스 업데이트
    setIndex(page);
  };

  return (
      <View style={styles.container}>
        <FlatList
          ref={listRef} // ref 연결
          data={DATA} // 루프용 데이터 (앞뒤 복사본 포함)
          horizontal
          pagingEnabled // 한 페이지씩 스냅
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={1} // 렌더 시 실제 첫 이미지로 시작
          getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })} // scrollToIndex 안전화
          renderItem={({ item }) => (
            <Image source={item} style={styles.img} resizeMode="cover" />
          )}
          keyExtractor={(_, i) => String(i)}
          onMomentumScrollEnd={onMomentumScrollEnd} // 끝 도달 시 루프 처리
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: { height: scaledHeight }, // 이미지 컨테이너 높이
  img: { width: width, height: scaledHeight }, // 이미지 사이즈 (가로 전체)
});
