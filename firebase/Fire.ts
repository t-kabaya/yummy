import userInfo from '../utils/userInfo'
import { uploadImage } from './Storage'

const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

const COLLECTION_POST = 'postCollection'
const COLLECTION_USER = 'user'
export const SUBCOLLECTION_NICED_USER = 'nicedUser'
export const SUBCOLLECTION_COMMENT = 'comment'
export const STORAGE_PATH_USER_ICON = 'userIcon'

firebase.initializeApp(
  __DEV__
    ? require('./firebaseconfigStaging.json')
    : require('./firebaseconfig.json')
)

firebase.firestore().settings({ timestampsInSnapshots: true })

export const postCollection = firebase.firestore().collection(COLLECTION_POST)
export const userCollection = firebase.firestore().collection(COLLECTION_USER)

export const uploadPhotoAsync = async (uri: string): Promise<string | null> => {
  const path = `${COLLECTION_USER}/${userInfo.userId}/${now()}.jpg`
  return uploadImage(uri, path)
}

/*---------- utils ----------*/

// use server time instead of mobile time
export const now = () => firebase.firestore.Timestamp.now()
