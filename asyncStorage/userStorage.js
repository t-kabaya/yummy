import { AsyncStorage } from 'react-native'

const USER_NAME = 'userName'

export const saveUserName = async userName => {
  try {
    AsyncStorage.setItem(USER_NAME, userName)
    console.log('saved userName')
  } catch (e) {
    console.error(e.message)
  }
}

export const getUserName = async () => {
  try {
    const value = await AsyncStorage.getItem(USER_NAME)
    if (value !== null) {
      console.log('get user name: ', value)
    }
    return value
  } catch (e) {
    console.errer(e.message)
    // Error retrieving data
  }
}

export const clearAsyncStorage = async () => {
  try {
    AsyncStorage.clear()
    console.log('cleared asyncStorage')
  } catch (e) {
    console.error(e.message)
  }
}
