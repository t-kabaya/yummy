// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'

import tabBarIcon from '../components/tabBarIcon'
import FeedStack from './FeedStack'
import MyPageStack from './MyPageStack'
import SelectImageStack from './SelectImageStack'

const navigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        tabBarIcon: tabBarIcon('home')
      }
    },
    Photo: {
      screen: SelectImageStack,
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
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray'
    }
  }
)

export default createStackNavigator(
  {
    Main: {
      screen: navigator,
      navigationOptions: { header: null }
    }
  },
  {
    cardStyle: { backgroundColor: 'white' }
  }
)