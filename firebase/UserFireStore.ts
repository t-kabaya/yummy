import { postCollection,  userCollection, STORAGE_PATH_USER_ICON, now } from './Fire'
import userInfo from '../utils/userInfo'
import Constants from 'expo-constants'
import { uploadImage } from './Storage'
import { saveUserName } from '../asyncStorage/UserStorage'

export const getUserData = async (): Promise<string | null> => {
  try {
    const doc = await userCollection.doc(userInfo.userId).get()
    if (doc.exists) {
      const userData = doc.data()
      console.log({userData})
      return doc.data()
    }

    return null
  } catch ({ message }) {
    console.error(message)
    return null
  }
}

export const getUserName = async (): Promise<string | null> => {
  try {
    const doc = await userCollection.doc(userInfo.userId).get()
    if (doc.exists) {
      const { userName } = doc.data()
      return userName
    }

    return null
  } catch ({ message }) {
    console.error(message)
    return null
  }
}

export const getUserOwnIcon = async () => {
  try {
    const doc = await userCollection.doc(userInfo.userId).get()
    if (doc.exists) {
      const { icon } = doc.data()
      return icon
    }

    return null
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
  const postRef = postCollection
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
