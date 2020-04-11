import {userCollection} from './Fire'
import userInfo from '../utils/userInfo'

export const getUserName = async (cb: any): Promise<string | null> => {
  try {
    userCollection.doc(userInfo.userId).onSnapshot((doc: any) => {
      const { userName } = doc && doc.data() && doc.data()
      cb(userName)
      return userName
    })

    return null
  } catch ({ message }) {
    console.error(message)
    return null
  }
}