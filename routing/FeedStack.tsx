import * as React from 'react';
import FeedScreen from '../screens/FeedScreen'
import PostCommentScreen from '../screens/PostCommentScreen'
import { createStackNavigator } from '@react-navigation/stack'

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ title: 'yummy' }} />
      <Stack.Screen name="PostCommentScreen" component={PostCommentScreen} options={{ title: 'コメント' }} />
    </Stack.Navigator>
  );
}

// export default createStackNavigator(
//   {
//     FeedScreen: {
//       screen: FeedScreen,
//       navigationOptions: { title: 'yummy' }
//     },
//     PostCommentScreen: {
//       screen: PostCommentScreen,
//       navigationOptions: { title: 'コメント' }
//     }
//   },
//   {
//     cardStyle: { backgroundColor: 'white' }
//   }
// )
