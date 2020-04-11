import userInfo from '../utils/userInfo'
import shrinkImageAsync from '../utils/shrinkImageAsync'
import { uploadImage } from './Storage'
import Constants from 'expo-constants'
// import { userInfo } from '../utils/userInfo'
import { getUserName, saveUserName } from '../asyncStorage/userStorage'

const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

// keys
const collectionName = 'postCollection'
const SUBCOLLECTION_NICED_USER = 'nicedUser'
const SUBCOLLECTION_COMMENT = 'comment'
const COLLECTION_USER = 'user'
const STORAGE_PATH_USER_ICON = 'userIcon'

firebase.initializeApp(
  __DEV__
    ? require('./firebaseconfigStaging.json')
    : require('./firebaseconfig.json')
)

firebase.firestore().settings({ timestampsInSnapshots: true })

const collection = firebase.firestore().collection(collectionName)
const userCollection = firebase.firestore().collection(COLLECTION_USER)

export const getPaged = async ({ size, start }) => {
  let feedRef = collection.orderBy('timestamp', 'desc').limit(size)
  try {
    if (start) {
      feedRef = feedRef.startAfter(start)
    }

    const querySnapshot = await feedRef.get()
    const feedData = []
    querySnapshot.forEach(doc => {
      if (doc.exists) {
        const post = doc.data() || {}
        // console.log({ post })

        // Reduce the name
        const user = post.user || {}

        // TODO: use user name
        const name = Constants.deviceName
        const reduced = {
          key: doc.id,
          name: (name || '').trim(),
          ...post
        }
        feedData.push(reduced)
      }
    })

    const feedItemsWithNicedUser = []
    // fetch data from subCollections
    for (item of feedData) {
      const nicedUsers = []
      const nicedUserRef = await collection
        .doc(item.key)
        .collection(SUBCOLLECTION_NICED_USER)
        .get()

      // nicedUserRef size always 1.
      nicedUserRef.forEach(doc => {
        nicedUsers.push(doc.data())
      })

      const isINiced = nicedUsers.some(user => user.userId === userInfo.userId)

      feedItemsWithNicedUser.push({
        ...item,
        nicedUsers,
        isINiced
      })
    }

    const itemsWithNicedUserAndUserIcon = []
    for (item of feedItemsWithNicedUser) {
      const userData = await userCollection.doc(userInfo.userId).get()
      const userIcon = await _getUserOwnIcon()
      itemsWithNicedUserAndUserIcon.push({ ...item, userIcon })
    }

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    return { posts: itemsWithNicedUserAndUserIcon, cursor: lastVisible }
  } catch ({ message }) {
    console.error(message)
  }
}

export const getUserPosts = async () => {
  console.log('getUserPosts')
  let feedRef = collection
  // .orderBy('timestamp', 'desc')
  // .limit(size)
  try {
    const querySnapshot = await feedRef
      .where('userId', '==', userInfo.userId)
      .get()
    const myPageItems = []
    querySnapshot.forEach(doc => {
      if (doc.exists) {
        const post = doc.data() || {}

        const user = post.user || {}

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

export const uploadPhotoAsync = async uri => {
  const path = `${collectionName}/${userInfo.userId}/${now()}.jpg`
  return uploadImage(uri, path)
}

export const post = async ({ text, image: localUri }) => {
  try {
    const { uri: reducedImage, width, height } = await shrinkImageAsync(
      localUri
    )

    const userName = await getUserName()
    if (userName !== '') {
      userInfo.userName = userName
    }

    const remoteUri = await uploadPhotoAsync(reducedImage)
    collection.add({
      userId: userInfo.userId,
      text,
      timestamp: now(),
      imageWidth: width,
      imageHeight: height,
      image: remoteUri,
      user: userInfo,
      createdAt: now()
    })
  } catch ({ message }) {
    alert(message)
  }
}

export const toggleNice = async contentId => {
  if (!contentId) return

  try {
    const ref = collection.doc(contentId)

    const nicedUserRef = ref.collection(SUBCOLLECTION_NICED_USER)

    const myNice = await nicedUserRef
      .where('userId', '==', userInfo.userId)
      .get()

    const userName = await getUserName()

    const isNicedAlready = !myNice.empty
    if (isNicedAlready) {
      myNice.forEach(x => {
        nicedUserRef.doc(x.id).delete()
      })
    } else {
      nicedUserRef.add({
        userId: userInfo.userId,
        userName: userName === '' ? userInfo.userName : userName
      })
    }
  } catch ({ message }) {
    console.error(message)
  }
}

export const getComment = async (contentId, cb) => {
  try {
    const commentRef = collection
      .doc(contentId)
      .collection(SUBCOLLECTION_COMMENT)
      .orderBy('createdAt', 'desc')

    commentRef.onSnapshot(querySnapshot => {
      comments = []
      querySnapshot.forEach(doc => comments.push(doc.data()))
      cb(comments)
    })
  } catch ({ message }) {
    console.error(message)
    return []
  }
}

export const postComment = async (contentId, comment) => {
  if (!contentId || comment === '') return

  try {
    const feedItemRef = collection.doc(contentId)
    const commentSubcollection = feedItemRef.collection(SUBCOLLECTION_COMMENT)

    const userName = await getUserName()
    const userIcon = await _getUserOwnIcon()

    commentSubcollection.add({
      comment,
      userId: userInfo.userId,
      userName: userName === '' ? userInfo.userName : userName,
      userIcon: userIcon || null,
      createdAt: now()
    })
  } catch ({ message }) {
    console.error(message)
  }
}

/*---------- userSettings ----------*/

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

export const getUserOwnIcon = async cb => {
  try {
    userCollection.doc(userInfo.userId).onSnapshot(doc => {
      const icon = doc && doc.data() && doc.data().icon
      cb(icon)
      return icon
    })
  } catch ({ message }) {
    return null
  }
}

export const _getUserOwnIcon = async () => {
  try {
    const userData = await userCollection.doc(userInfo.userId).get()
    const userIcon = userData && userData.data() && userData.data().icon

    return userIcon
  } catch ({ message }) {
    console.error(message)
  }
}

/*---------- utils ----------*/

// use server time instead of mobile time
const now = () => firebase.firestore.Timestamp.now()
