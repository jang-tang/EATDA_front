import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Sub_Top from '../sub_TopBar';
import Notice from './alarm_element';

const { width } = Dimensions.get('window');

export default function Alarm() {
  return (
    <>
      <Sub_Top title="알림" />
      
      {/* ScrollView로 바꿈 */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        <Notice title='재고알림'/>
        <View style={styles.divider}></View>
        <Notice title='픽업 예약 알림'/>
        <View style={styles.divider}></View>
        <Notice />
        <View style={styles.divider}></View>
        <Notice />
        <View style={styles.divider}></View>
        <Notice />
        <View style={styles.divider}></View>
        <Notice />
        <View style={styles.divider}></View>
        <Notice />
        <View style={styles.divider}></View>
        <Notice />
        <View style={styles.divider}></View>
        <Notice />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
