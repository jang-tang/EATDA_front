import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Sub_Top from '../elements/sub_TopBar';

const { width } = Dimensions.get('window');

export default function Profile() {
  return (
    <>
      <Sub_Top title="프로필" />

      <View style={styles.container}>
        {/* 프로필 사진 + 수정 아이콘 */}
        <View style={styles.profileWrapper}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIconContainer} activeOpacity={0.8}>
            <Feather name="edit-2" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* 닉네임 */}
        <Text style={styles.nicknameLabel}>닉네임</Text>

        {/* 인풋 */}
        <TextInput
          style={styles.input}
          placeholder="별명을 입력하세요"
          placeholderTextColor="#999"
        />

        {/* 회원 탈퇴하기 */}
        <TouchableOpacity activeOpacity={0.9} onPress={()=> {AsyncStorage.clear(); console.log(1)}}>
          <Text style={styles.withdrawText}>회원 탈퇴하기</Text>
        </TouchableOpacity>
      </View>

      {/* 수정하기 버튼 (화면 하단) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>수정하기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: 'white',
    flex: 1,
  },
  profileWrapper: {
    alignSelf: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 15,
    marginBottom: 25,
    backgroundColor: '#ddd',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 25, // 이미지 내부의 아래쪽
    right: 10,  // 이미지 내부의 오른쪽
    backgroundColor: '#007BFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  nicknameLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    fontSize: 25,
    marginVertical: 10,
  },
  withdrawText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: width,
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: '#007BFF',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
