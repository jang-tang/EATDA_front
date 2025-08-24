import { API_BASE_URL } from '@/config';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Top from '../elements/Topbar';
import Map_store from './map_element/map_store';

const { width, height } = Dimensions.get('window');

async function Get_stores() {
  try {
    const response = await fetch(`${API_BASE_URL}/stores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    return data;
  
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

export default function Map() {
  useFocusEffect(
    useCallback(() => {
      return () => {
        latitude = undefined;
        longitude = undefined;
        setRegion({
          latitude: latitude ? Number(latitude) : 37.37368,
          longitude: longitude ? Number(longitude) : 126.7956,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      };
    }, [])
  );

  const [searchWord, setSearchWord] = useState<string>('');
  const [stores, setStores] = useState<any[]>([]);
  const [showStoreBox, setshowStoreBox] = useState<number>(-1);
  let { latitude, longitude } = useLocalSearchParams<{ latitude?: string; longitude?: string; }>();
  const [region, setRegion] = useState<Region>({
    latitude: latitude ? Number(latitude) : 37.37368,
    longitude: longitude ? Number(longitude) : 126.7956,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [boxImage, setBoxImage] = useState('');
  const [boxTitle, setBoxTitle] = useState('');
  const [boxLocation, setBoxLocation] = useState(' ');
  const [boxTel, setBoxTel] = useState(' ');
  const [boxId, setBoxId] = useState<number>(0);

  useEffect(() => {
    const fetchStores = async () => {
      const data = await Get_stores();
      if (data) {
        setStores(data);
      }
    };
    fetchStores();
  }, []);

  return (
    <>
      <Top searchWord={searchWord} setSearchWord={setSearchWord}/>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          {stores
            .filter(store =>
              searchWord === '' ? true : store.store_name.toLowerCase().includes(searchWord.toLowerCase())
            )
            .map((store) => (
              <Marker
                key={store.store_id}
                coordinate={{ latitude: Number(store.latitude), longitude: Number(store.longitude) }}
                title={store.store_name}
                description={`${store.store_name} 위치`}
                onPress={() => {
                  setshowStoreBox(1);
                  setBoxImage(store.image_url);
                  setBoxLocation(store.road_address);
                  setBoxTel(store.phone_number);
                  setBoxTitle(store.store_name);
                  setBoxId(store.store_id);
                }}
              />
            ))
          }
        </MapView>

        <View style={styles.mol}>
          <View style={styles.storeBoxWrapper}>
            {showStoreBox === 1 && (
              <Map_store
                image={boxImage}
                title={boxTitle}
                location={boxLocation}
                tel={boxTel}
                store_id={boxId}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  storeBoxWrapper: {
    marginHorizontal: 15,
  },
  mol: {
    position: 'absolute',
    right: width / 19,
    bottom: 15,
    width: width,
    zIndex: 10,
  },
});
