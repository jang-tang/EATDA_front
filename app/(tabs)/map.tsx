import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Top from '../elements/Topbar';
import Map_store from './map_element/map_store';

const { width, height } = Dimensions.get('window');

export default function Map() {
  const [showStoreBox, setshowStoreBox] = useState<number>(-1);
  const [region, setRegion] = useState<Region>({
    latitude: 37.37368,
    longitude: 126.7956,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <>
      <Top />
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          <Marker
            coordinate={{ latitude: 37.37368, longitude: 126.7956 }}
            title="시흥가온중학교"
            description="시흥가온중학교 위치"
            onPress={() => setshowStoreBox(-showStoreBox)}
          />
        </MapView>

        {/* 맵 위에 겹쳐서 뜨도록 절대 위치 지정 */}
        <View style={styles.mol}>
        <View style={styles.storeBoxWrapper}>
          {showStoreBox === 1 && (<Map_store
            image={require('../../assets/images/bakery.png')}
            title={'솔빛 베이커리'}
            location={'안산시 단원구 사세충열로 94'}
            tel={'Tel)031-363-7800'}
          />)}
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
  
  marginHorizontal:15
  },
mol:{
  position: 'absolute',
  right: width/19,
  bottom: 15,                // 화면 아래에서 15만큼 띄우기
  width: width,        // 화면 너비의 90%로 고정
  zIndex: 10,
}

});
