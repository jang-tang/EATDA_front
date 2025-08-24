import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

type TopProps = {
  searchWord: string;
  setSearchWord: (text: string) => void;
};

export default function Store_Top({ searchWord, setSearchWord }: TopProps) {
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {searchMode ? (
          <>
            {/* 검색 모드일 때 */}
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              onPress={() => {
                setSearchMode(false)
                setSearchWord('')
                setSearchText('')

              }
              }
            >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력하세요"
              value={searchText}
              onChangeText={setSearchText} // 입력할 때는 로컬 state만 바꿈
              onSubmitEditing={() => {
                setSearchWord(searchText); // 엔터(완료) 시 상위 state 변경
              }}
              autoFocus
            />
          </>
        ) : (
          <>
            {/* 기본 모드 */}
            <View style={styles.leftContainer}>
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.75}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color="#006AE6" />
              </TouchableOpacity>
              <Text style={styles.title}>EATDA</Text>
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.75}
                onPress={() => setSearchMode(true)}
              >
                <Ionicons name="search-outline" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.75}
                onPress={() => router.push('/elements/Notice/alarm')}
              >
                <Ionicons name="notifications-outline" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.75}
                onPress={() => router.push('/elements/profile')}
              >
                <Ionicons name="person-circle-outline" size={26} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={styles.divider}></View>
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#006AE6',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
  },
});
