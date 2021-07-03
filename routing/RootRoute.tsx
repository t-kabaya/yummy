import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBarIcon from '../components/tabBarIcon'
import FeedStack from './FeedStack'
import MyPageStack from './MyPageStack'
import SelectImageStack from './SelectImageStack'
import { BottomTabParamList  } from 'type'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default () => (
  <BottomTab.Navigator
    initialRouteName="Feed">
    <BottomTab.Screen
      name="Feed"
      component={FeedStack}
      options={{
        tabBarLabel: "ホーム",
        tabBarIcon: ({color, size}) => TabBarIcon('home')
      }}
    />
    <BottomTab.Screen
      name="SelectImage"
      component={SelectImageStack}
      options={{
        tabBarLabel: "新規",
        tabBarIcon: ({color, size}) => TabBarIcon('control-point')
      }}
    />
    <BottomTab.Screen
      name="MyPage"
      component={MyPageStack}
      options={{
        tabBarLabel: "マイページ",
        tabBarIcon: ({color, size}) => TabBarIcon('account-circle')
      }}
    />
  </BottomTab.Navigator>
)
