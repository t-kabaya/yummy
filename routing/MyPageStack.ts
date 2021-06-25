import { createStackNavigator } from 'react-navigation-stack'
import UserPageScreen from '../screens/UserPageScreen'
import EditUserProfileScreen from '../screens/EditUserProfileScreen'

export default createStackNavigator(
  {
    UserPageScreen: {
      screen: UserPageScreen,
      navigationOptions: { title: 'マイページ',  headerShown: false }
    },
    EditUserProfileScreen: {
      screen: EditUserProfileScreen,
      navigationOptions: { title: 'プロフィールを編集',  header: null }
    }
  },
  {
    cardStyle: { backgroundColor: 'white' }
  }
)
