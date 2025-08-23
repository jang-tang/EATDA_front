import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface StoreBoxProps {
  store_id:number
  store_name:string
  latitude:number   
  longitude:number
  image_url:string
  road_address:string
  phone_number:string
  maxSale:number
  }

export default function Star_storeProductBox({ store_id, store_name,latitude,longitude,image_url,road_address,phone_number,maxSale }: StoreBoxProps) {
  return (
      <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={()=> {
        router.push({
        pathname: '/elements/store_page',
        params: {
          store_id: store_id,
          image: image_url,
          title: store_name,
          location: road_address,
          tel: phone_number
        }
      });}}>
      <Image source={{uri:image_url}} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.sale} numberOfLines={1} ellipsizeMode="tail">최대 {maxSale}% 할일</Text>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{store_name}</Text>
        <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{road_address}</Text>
        <Text style={styles.tel} numberOfLines={1} ellipsizeMode="tail">{`tel) ${phone_number}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20,
    height: 110,
    marginVertical: 20,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,                  
    marginVertical: 13,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 5,
    color: '#333',
  },
  sale: {
    color: '#006AE6',
    fontSize: 15,
  },
  tel: {
    fontSize: 15,
    color: '#666666',
    marginTop: 3,
  },
  location: {
    fontSize: 15,
    color: '#666666',
    marginTop: 10,
    
  },
});