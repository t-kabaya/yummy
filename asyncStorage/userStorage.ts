import { AsyncStorage } from 'react-native'

const USER_NAME = 'userName'

export const saveUserName = async(userName: string) => {
  try {
    AsyncStorage.setItem(USER_NAME, userName)
  } catch ({ message }) {
    console.error(message)
  }
}

export const getUserName = async () => {
  try {
    const userName = await AsyncStorage.getItem(USER_NAME)
    return userName || ''
  } catch ({ message }) {
    console.error(message)
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
