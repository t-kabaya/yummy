import * as React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import tabBarIcon from '../components/tabBarIcon'
import FeedStack from './FeedStack'
import MyPageStack from './MyPageStack'
import SelectImageStack from './SelectImageStack'
import { BottomTabParamList  } from 'type'

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default () => (
  <BottomTab.Navigator
    initialRouteName="Feed">
    <BottomTab.Screen
      name="Feed"
      component={FeedStack}
    />
    <BottomTab.Screen
      name="SelectImage"
      component={SelectImageStack}
    />
    <BottomTab.Screen
      name="MyPage"
      component={MyPageStack}
    />
  </BottomTab.Navigator>
)
