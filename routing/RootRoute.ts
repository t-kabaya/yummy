// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'

import tabBarIcon from '../components/tabBarIcon'
// Import the screens
import FeedScreen from '../screens/FeedScreen'
import NewPostScreen from '../screens/NewPostScreen'
import SelectPhotoScreen from '../screens/SelectPhotoScreen'
import UserPageScreen from '../screens/UserPageScreen'
import { getUserName } from '../asyncStorage/userStorage'
import PostCommentScreen from '../screens/PostCommentScreen'
import FeedStack from './FeedStack'
import MyPageStack from './MyPageStack'

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedStack,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon('home')
      }
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('add-circle')
      }
    },
    UserPageScreen: {
      screen: MyPageStack,
      navigationOptions: {
        tabBarIcon: tabBarIcon('account-circle')
      }
    }
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray'
    }
  }
)

export default createStackNavigator(
  {
    // Main: {
    //   screen: navigator,
    //   navigationOptions: { header: null }
    // },
    // This screen will not have a tab bar
    NewPost: {
      screen: NewPostScreen,
      navigationOptions: { header: null }
  
    }
  },
  {
    cardStyle: { backgroundColor: 'white' }
  }
)