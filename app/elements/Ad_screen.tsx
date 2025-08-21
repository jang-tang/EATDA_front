// Ad.tsx
import { API_BASE_URL } from '@/config';
import React, { useEffect, useRef, useState } from 'react';
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

async function getAd() {
  try {
    const response = await fetch(`${API_BASE_URL}/advertisements`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    return [];
  }
}

export default function Ad_screen() {
  const listRef = useRef<FlatList<any> | null>(null);
  const [images, setImages] = useState<any[]>([]); // 실제 이미지 배열
  const [data, setData] = useState<any[]>([]);     // FlatList용 앞뒤 복사본 포함 배열
  const [index, setIndex] = useState<number>(1);

  useEffect(() => {
    const fetchAds = async () => {
      const ad_zip = await getAd();
      const urls = ad_zip.map((ad: { ad_image_url: any; }) => ({ uri: ad.ad_image_url }));
      setImages(urls);

      // 루프용 배열 생성 (앞뒤 복사본)
      if (urls.length > 0) {
        setData([urls[urls.length - 1], ...urls, urls[0]]);
      }
    };

    fetchAds();
  }, []);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    if (page === 0) {
      listRef.current?.scrollToIndex({ index: images.length, animated: false });
      setIndex(images.length);
      return;
    }
    if (page === data.length - 1) {
      listRef.current?.scrollToIndex({ index: 1, animated: false });
      setIndex(1);
      return;
    }
    setIndex(page);
  };

  if (data.length === 0) return null; // 데이터 없으면 렌더링하지 않음

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <Image source={item} style={styles.img} resizeMode="cover" />
        )}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: scaledHeight },
  img: { width: width, height: scaledHeight },
});
