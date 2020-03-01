// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'

import tabBarIcon from '../utils/tabBarIcon'
// Import the screens
import FeedScreen from '../screens/FeedScreen'
import NewPostScreen from '../screens/NewPostScreen'
import SelectPhotoScreen from '../screens/SelectPhotoScreen'
import UserPageScreen from '../screens/UserPageScreen'
import { getUserName } from '../asyncStorage/userStorage'
import PostCommentScreen from '../screens/PostCommentScreen'
console.disableYellowBox = true

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    PostCommentScreen,
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
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
      screen: UserPageScreen,
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

const createMainNavigator = async () => {
  const userName = await getUserName()

  return createStackNavigator(
    {
      Main: {
        // if user name not exists, user hasn't register yet
        screen: navigator,
        // Set the title for our app when the tab bar screen is present
        navigationOptions: { title: 'Yummy' }
      },
      // This screen will not have a tab bar
      NewPost: NewPostScreen
    },
    {
      cardStyle: { backgroundColor: 'white' }
    }
  )
}

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const stackNavigator = createStackNavigator(
  {
    Main: {
      // if user name not exists, user hasn't register yet
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: { title: 'Yummy' }
    },
    // This screen will not have a tab bar
    NewPost: NewPostScreen
  },
  {
    cardStyle: { backgroundColor: 'white' }
  }
)

// Export it as the root component
export default stackNavigator
