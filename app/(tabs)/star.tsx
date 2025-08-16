import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'; // 아이콘 임포트
import Top from '../elements/Topbar';
import Star_store from './start_element/star_store';

const { width, height } = Dimensions.get('window');

export default function Star() {
  return (
    <>
      <Top/>
      {/* 헤드 + 매장들을 ScrollView로 감싸기 */}
      <ScrollView style={styles.container}>
        <View style={styles.head_con}>
          <Text style={styles.headline}>관심 브랜드</Text>
          <View style={styles.sortContainer}>
            <Text style={styles.sort_name}>인기순</Text>
            <Entypo name="list" size={20} style={styles.icon} />
          </View>
        </View>
        {/*매장들*/}
        <Star_store 
          image={require('../../assets/images/한울 식자재 마트 프로필 사진.png')}
          title={'한울 식자재 마트'}
          location='안산시 단원구 사세충열로 94'
          tel='Tel) 031-363-7800' 
          sale={50}          
        />
        <View style={styles.divider_half}></View>
        <Star_store 
          image={require('../../assets/images/bakery.png')} 
          title={'솔빛 베이커리'} 
          location='안산시 단원구 사세충열로 94' 
          tel='Tel) 031-363-7800'
          sale={40}  
        />
        <View style={styles.divider_half}></View>
        <Star_store 
          image={require('../../assets/images/별미네 반찬가게 프로필 사진.png')} 
          title={'별미네 반찬가게'} 
          location='안산시 단원구 사세충열로 94' 
          tel='Tel) 031-363-7800'
          sale={60}  
        />
        <View style={styles.divider_half}></View>
        <Star_store 
          image={require('../../assets/images/마루푸드 마켓 프로필 사진.png')} 
          title={'마루푸드 마켓'} 
          location='안산시 단원구 사세충열로 94' 
          tel='Tel) 031-363-7800'
          sale={30}  
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sort_name:{
    fontSize:14,
    color:"grey",
  },
  headline:{
    fontSize:20,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
  },
  divider_half: {
    height: 1,
    backgroundColor: '#D3D3D4',
    marginHorizontal: 25
  },
  container:{
    backgroundColor: "#FFFFFF",
    flex: 1, 
  },
  head_con :{
    flexDirection:"row",
    justifyContent: 'space-between',  // 양쪽 끝 정렬
    marginTop:20,
    marginHorizontal:20,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // 텍스트와 아이콘 수직 가운데 정렬
  },
  icon: {
    marginLeft: 5,
    color:"grey"
  }
});
