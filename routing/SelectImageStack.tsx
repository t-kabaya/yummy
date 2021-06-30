import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SelectPhotoScreen from '../screens/SelectPhotoScreen'
import NewPostScreen from '../screens/NewPostScreen'
import { RootStackParamList } from 'type'

const Stack = createStackNavigator<RootStackParamList>()

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SelectPhotoScreen" component={SelectPhotoScreen} options={{ title: '新規投稿' }} />
    <Stack.Screen name="NewPostScreen" component={NewPostScreen} options={{ title: 'プロフィールを編集' }} />
  </Stack.Navigator>
)
