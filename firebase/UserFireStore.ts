import { postCollection,  userCollection, STORAGE_PATH_USER_ICON, now } from './Fire'
import userInfo from '../utils/userInfo'
import Constants from 'expo-constants'
import { uploadImage } from './Storage'

type userData = {
  name: string,
  icon: string
}

const INITIAL_USER_DATA = {
  name: "名無しさん",
  icon: "https://firebasestorage.googleapis.com/v0/b/yummy-7f43f.appspot.com/o/commonAssets%2Fhuman.png?alt=media&token=2e477f9d-3157-496e-a505-992eeeecdee3"
}

export const getUserData = async (): Promise<userData | null> => {
  try {
    const doc = await userCollection.doc(userInfo.userId).get()
    if (doc.exists) {
      const userData = doc.data()
      console.log({userData})
      return doc.data()
    }

    // yet registered.
    return INITIAL_USER_DATA
  } catch ({ message }) {
    console.error(message)
    return null
  }
}

export const getUserName = async (): Promise<string> => {
  const userData: userData | null = await getUserData()
  return userData?.name ? userData.name : INITIAL_USER_DATA.name
}

export const getUserOwnIcon = async (): Promise<string> => {
  const userData: userData | null = await getUserData()
  return userData?.icon ? userData.icon : INITIAL_USER_DATA.icon
}

export const uploadUserInfosAsync = async (iconUri: string, userName: string) => {
  try {
    const path = `${STORAGE_PATH_USER_ICON}/${userInfo.userId}.jpg`
    const iconRemoteUri = await uploadImage(iconUri, path)

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
