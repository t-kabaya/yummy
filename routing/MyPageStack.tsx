import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserPageScreen from '../screens/UserPageScreen'
import EditUserProfileScreen from '../screens/EditUserProfileScreen'
import { RootStackParamList } from 'type'

const Stack = createStackNavigator<RootStackParamList>();

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserPageScreen" component={UserPageScreen} options={{ title: 'マイページ' }} />
    <Stack.Screen name="EditUserProfileScreen" component={EditUserProfileScreen} options={{ title: 'プロフィールを編集' }} />
  </Stack.Navigator>
)
