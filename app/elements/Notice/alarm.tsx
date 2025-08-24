import { API_BASE_URL, AuthProvider } from '@/config';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Sub_Top from '../sub_TopBar';
import Notice from './alarm_element';

const { width } = Dimensions.get('window');

async function Get_myNotice(user_id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/notices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id : user_id
      }),
    });

    const data = await response.json();
    return data
  
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

export default function Alarm() {
  const [notices, setNotices] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchStores = async () => {
      const user_id = await AuthProvider()
      const data = await Get_myNotice(user_id);
      if (data) {
        setNotices(data);
      }
    };
    fetchStores();
  }, []);

  return (
    <>
      <Sub_Top title="알림" />
      
      {/* ScrollView로 바꿈 */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        {notices.map((notice, index) => (
          <React.Fragment key={notice.notice_id}>
            {index != 0 && <View style={styles.divider} />}
            <Notice
              title={notice.title}
              storeName={notice.store_name}
              date={notice.created_at}
              OnPress={notice.type === '결제 완료'
                ? () => {
                  router.push({
                    pathname: '/elements/reivew/write_review',
                    params: {
                      product_id: notice.product_id,
                      product_name: notice.product_name,
                      store_id: notice.store_id,
                      store_name: notice.store_name
                    }
                  });
                  }
                : () => {
                    console.log('다른 타입 눌림');
                  }} 
              type={notice.type}    
            />
          </React.Fragment>
        ))}
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
