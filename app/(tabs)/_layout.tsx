import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './home';
import Map from './map';
import Star from './star';

const Tab = createBottomTabNavigator();

type IoniconName =
  | 'home'
  | 'home-outline'
  | 'map'
  | 'map-outline'
  | 'star'
  | 'star-outline';
  
export default function TabsLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => {
          let iconName: IoniconName;
          switch (route.name) {
            case '홈':
              iconName = 'home-outline';
              break;
            case '지도':
              iconName = 'map-outline';
              break;
            case '즐겨찾기':
              iconName = 'star-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return {
            headerShown: false,
            tabBarActiveTintColor: '#006AE6',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={iconName} size={size} color={color} />
            ),
          };
        }}
      >
        <Tab.Screen name="홈" component={Home} />
        <Tab.Screen name="지도" component={Map} />
        <Tab.Screen name="즐겨찾기" component={Star} />
      </Tab.Navigator>
    </ThemeProvider>
  );
}
