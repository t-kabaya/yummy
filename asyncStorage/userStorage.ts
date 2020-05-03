import { AsyncStorage } from 'react-native'

const USER_NAME = 'userName'

export const saveUserName = async userName => {
  try {
    AsyncStorage.setItem(USER_NAME, userName)
    // console.log('saved userName')
  } catch ({ message }) {
    console.error(message)
  }
}

export const getUserName = async () => {
  try {
    const userName = await AsyncStorage.getItem(USER_NAME)
    return userName || ''
  } catch ({ message }) {
    console.errer(message)
  }
}

export const clearAsyncStorage = async () => {
  try {
    AsyncStorage.clear()
    console.log('cleared asyncStorage')
  } catch ({ message }) {
    console.error(message)
  }
}
