import * as React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'

import tabBarIcon from '../components/tabBarIcon'
import FeedStack from './FeedStack'
import MyPageStack from './MyPageStack'
import SelectImageStack from './SelectImageStack'

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
      <RootNavigator />
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={FeedStack} />
      <Stack.Screen name="NotFound" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
