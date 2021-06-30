import * as React from 'react'
import FeedScreen from '../screens/FeedScreen'
import PostCommentScreen from '../screens/PostCommentScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from 'type'

const Stack = createStackNavigator<RootStackParamList>()

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ title: 'yummy' }} />
    <Stack.Screen name="PostCommentScreen" component={PostCommentScreen} options={{ title: 'コメント' }} />
  </Stack.Navigator>
)