import { createStackNavigator } from 'react-navigation-stack'

import FeedScreen from '../screens/FeedScreen'
import PostCommentScreen from '../screens/PostCommentScreen'

export default createStackNavigator(
  {
    FeedScreen: {
      screen: FeedScreen,
      navigationOptions: { title: 'yummy' }
    },
    PostCommentScreen: {
      screen: PostCommentScreen,
      navigationOptions: { title: 'コメント' }
    }
  },
  {
    cardStyle: { backgroundColor: 'white' }
  }
)
