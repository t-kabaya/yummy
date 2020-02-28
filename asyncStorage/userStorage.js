import { AsyncStorage } from 'react-native'

const USER_NAME = 'userName'

export const saveUserName = async userName => {
  try {
    await AsyncStorage.setItem(USER_NAME, userName)
  } catch (error) {
    console.error('saveUserName')
  }
}
