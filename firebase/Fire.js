import userInfo from '../utils/userInfo'
import shrinkImageAsync from '../utils/shrinkImageAsync'
import uploadPhoto, { uploadImage } from '../utils/uploadPhoto'
import Constants from 'expo-constants'
// import { userInfo } from '../utils/userInfo'
import { getUserName } from '../asyncStorage/userStorage'

const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

// keys
const collectionName = 'snack-SJucFknGX'
const SUBCOLLECTION_NICED_USER = 'nicedUser'
const SUBCOLLECTION_COMMENT = 'comment'
const COLLECTION_USER = 'user'

firebase.initializeApp(require('./firebaseconfig.json'))
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
    querySnapshot.forEach(function (doc) {
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

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    return { data: feedItemsWithNicedUser, cursor: lastVisible }
  } catch ({ message }) {
    console.error(message)
  }
}

export const getUserPosts = async () => {
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
        myPageItems.push(reduced)
      }
    })

    return myPageItems
  } catch ({ message }) {
    console.error(message)
  }
}

export const uploadPhotoAsync = async uri => {
  console.log({ uploadPhotoAsync: uri })
  const path = `${collectionName}/${Constants.installationId}}.jpg`
  return uploadPhoto(uri, path)
}

export const uploadUserIconAsync = async iconUri => {
  // console.log({ uploadUserIconAsync: iconUri })
  // const { uri, width, height } = await shrinkImageAsync(iconUri)
  const userIcon = 'userIcon'
  const path = `${userIcon}/${Constants.installationId}.jpg`
  const iconRemoteUri = await uploadImage(path, iconUri)

  try {
    userCollection.doc(userInfo.userId).set({
      icon: iconRemoteUri,
      createdAt: firebase.firestore.Timestamp.now()
    })
  } catch ({ message }) {
    console.error(message)
  }
}

export const getUserOwnIcon = async () => {
  try {
    return (await userCollection.doc(userInfo.userId).get()).data().icon
  } catch ({ message }) {
    return null
  }
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
      timestamp: Date.now(),
      imageWidth: width,
      imageHeight: height,
      image: remoteUri,
      user: userInfo,
      createdAt: firebase.firestore.Timestamp.now()
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
  if (!contentId) return []

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

    commentSubcollection.add({
      comment: comment,
      userId: userInfo.userId,
      userName: userName === '' ? userInfo.userName : userName,
      userImage: '',
      createdAt: firebase.firestore.Timestamp.now()
    })
  } catch ({ message }) {
    console.error(message)
  }
}
