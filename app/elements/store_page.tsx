import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductBox from '../elements/goods';
import Stroe_Top from '../elements/store_top';
import Score from './reivew/average_score';
import R_component from './reivew/review_component';

export default function Page_of_store() {
  const [selectedTab, setSelectedTab] = useState('재고보기');

  return (
    <View style={styles.container}>
      {/* 고정 TopBar */}
      <Stroe_Top />

      {/* 스크롤 영역 */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* 헤드 부분 */}
          <View style={styles.head_container}>
            <Text style={styles.sale}>최대 50% 할인</Text>
            <View style={styles.headline}>
              <Text style={styles.head}>솔빛 베이커리</Text>
              <View style={styles.des_container}>
                <Text style={styles.description}>안산시 단원구 사세충열로 94</Text>
                <Text style={styles.description}>{`Tel)031-363-7800`}</Text>
              </View>
            </View>
          </View>

          {/* 선택 바 */}
          <View style={styles.selectBar}>
            {['재고보기', '평점 및 리뷰'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={[
                  styles.tabItem,
                  selectedTab === tab && styles.tabItemSelected,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.tabTextSelected,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 선택에 따른 내용 */}
          {selectedTab === '재고보기' && (
            <>
              <ProductBox
                image={require('../../assets/images/simpleBread.png')}
                title={'식빵'}
                sale={2250}
                price={4500}
                description='보관 기간 : 2일'
              />
              <View style={styles.divider_half}></View>
              <ProductBox
                image={require('../../assets/images/RedBeanBread.png')}
                title={'단팥빵'}
                sale={1200}
                price={2000}
                description='보관 기간 : 1일'
              />
              <View style={styles.divider_half}></View>
              <ProductBox
                image={require('../../assets/images/solt.png')}
                title={'소금빵'}
                sale={1400}
                price={2000}
                description='보관 기간 : 1일'
              />
            </>
          )}

          {selectedTab === '평점 및 리뷰' && (
            <>
            <View style={styles.review_con}>
              <Score/>
              <View style={styles.divider}></View>
              <R_component />
              <View style={styles.divider}></View>
              <R_component />
              <View style={styles.divider}></View>
              <R_component />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  review_con:{
    padding: 25
  },
  scrollContent: {
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
    marginVertical: 15,
  },
  divider_half: {
    height: 1,
    backgroundColor: '#D3D3D4',
    marginHorizontal: 25,
    marginVertical: 10,
  },
  selectBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabItem: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemSelected: {
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
  },
  tabTextSelected: {
    color: 'black',
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sale: {
    fontSize: 16,
    color: '#006AE6',
    marginTop: 10,
  },
  content: {
    marginVertical: 20,
  },
  head_container: {
    marginHorizontal: 20,
  },
  headline: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  head: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    color: '#A7A7A7',
  },
  des_container: {
    marginLeft: 10,
  },
});
