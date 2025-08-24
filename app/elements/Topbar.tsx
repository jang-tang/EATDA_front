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

export default function Top({ searchWord, setSearchWord }: TopProps) {
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* 검색 모드일 때 */}
        {searchMode ? (
          <>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                setSearchMode(false)
                setSearchWord('')
                setSearchText('')
              }
              }
            >
              <Ionicons name="arrow-back" size={21} />
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
              returnKeyType="search"
            />
          </>
        ) : (
          <>
            {/* 기본 모드 */}
            <Text style={styles.title}>EATDA</Text>
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
                onPress={() => {
                  router.push('/elements/Notice/alarm');
                }}
              >
                <Ionicons name="notifications-outline" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.75}
                onPress={() => {
                  router.push('/elements/profile');
                }}
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
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#006ae6',
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
    paddingHorizontal: 12,
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D4',
  },
});
