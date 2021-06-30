import * as React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'

import tabBarIcon from '../components/tabBarIcon'
import FeedStack from './FeedStack'
import MyPageStack from './MyPageStack'
import SelectImageStack from './SelectImageStack'
import { RootStackParamList  } from 'type'

const Stack = createStackNavigator<RootStackParamList>()

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Root" component={FeedStack} />
  </Stack.Navigator>
)
