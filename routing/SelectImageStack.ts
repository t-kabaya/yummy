import { createStackNavigator } from 'react-navigation'
import SelectPhotoScreen from '../screens/SelectPhotoScreen'
import NewPostScreen from '../screens/NewPostScreen'

export default createStackNavigator(
  {
    SelectPhotoScreen: {
      screen: SelectPhotoScreen,
      navigationOptions: { title: 'マイページ',  headerShown: false }
    },
    NewPostScreen: {
      screen: NewPostScreen,
      navigationOptions: { title: 'プロフィールを編集',  header: null }
    }
  },
  {
    cardStyle: { backgroundColor: 'white' }
  }
)
