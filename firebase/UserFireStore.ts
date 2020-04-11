import { collection,  userCollection, STORAGE_PATH_USER_ICON, now } from './Fire'
import userInfo from '../utils/userInfo'
import Constants from 'expo-constants'
import { uploadImage } from './Storage'
import { saveUserName } from '../asyncStorage/userStorage'

export const getUserName = async (cb: (userName: string) => void): Promise<string | null> => {
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

export const getUserOwnIcon = async (cb: (icon: string) => void) => {
  try {
    userCollection.doc(userInfo.userId).onSnapshot((doc: any) => {
      const icon = doc && doc.data() && doc.data().icon
      cb(icon)
      return icon
    })
  } catch ({ message }) {
    return null
  }
}

export const _getUserOwnIcon = async (): Promise<String | null> => {
  try {
    const userData = await userCollection.doc(userInfo.userId).get()
    const userIcon = userData && userData.data() && userData.data().icon

    return userIcon
  } catch ({ message }) {
    console.error(message)
    // firestore hate undefined
    return null
  }
}

export const uploadUserInfosAsync = async (iconUri: string, userName: string) => {
  const path = `${STORAGE_PATH_USER_ICON}/${userInfo.userId}.jpg`
  const iconRemoteUri = await uploadImage(iconUri, path)

  saveUserName(userName)

  try {
    userCollection.doc(userInfo.userId).set({
      icon: iconRemoteUri,
      userName,
      createdAt: now()
    })
  } catch ({ message }) {
    console.error(message)
  }
}

export const getUserPosts = async () => {
  const postRef = collection
  // .orderBy('timestamp', 'desc')
  // .limit(size)
  try {
    const querySnapshot = await postRef
      .where('userId', '==', userInfo.userId)
      .get()
    const myPageItems: any[] = []
    querySnapshot.forEach((doc: any) => {
      if (doc.exists) {
        const post = doc.data() || {}

        // TODO: use user name
        const name = Constants.deviceName
        const reduced = {
          key: doc.id,
          name: (name || '').trim(),
          ...post
        }
        myPageItems.push(reduced)
      }
    })

    return myPageItems
  } catch ({ message }) {
    console.error(message)
  }
}
