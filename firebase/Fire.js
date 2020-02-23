import userInfo from '../utils/userInfo'
import shrinkImageAsync from '../utils/shrinkImageAsync'
import uploadPhoto from '../utils/uploadPhoto'
import Constants from 'expo-constants'
// import { userInfo } from '../utils/userInfo'

const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

// keys
const collectionName = 'snack-SJucFknGX'
const COLLECTION_NICED_USER = 'nicedUser'

firebase.initializeApp(require('./firebaseconfig.json'))
firebase.firestore().settings({ timestampsInSnapshots: true })

const collection = firebase.firestore().collection(collectionName)

export const getPaged = async ({ size, start }) => {
  let ref = collection.orderBy('timestamp', 'desc').limit(size)
  try {
    if (start) {
      ref = ref.startAfter(start)
    }

    const querySnapshot = await ref.get()
    const data = []
    querySnapshot.forEach(function (doc) {
      if (doc.exists) {
        const post = doc.data() || {}
        console.log({ post })

        // Reduce the name
        const user = post.user || {}

        // TODO: use user name
        const name = Constants.deviceName
        const reduced = {
          key: doc.id,
          name: (name || '').trim(),
          ...post
        }
        data.push(reduced)
      }
    })

    const feedItemsWithNicedUser = []
    // fetch data from subCollections
    for (item of data) {
      const nicedUsers = []
      const nicedUserRef = await collection
        .doc(item.key)
        .collection(COLLECTION_NICED_USER)
        // .where('userId', '==', userInfo.userId)
        .get()

      // nicedUserRef size always 1.
      nicedUserRef.forEach(doc => {
        const nicedUser = doc.data()
        console.log({ nicedUser })

        nicedUsers.push(nicedUser)
      })

      const isINiced = nicedUsers.some(user => {
        console.log({ dbData: user.userId })
        console.log({ userInfoData: userInfo.userId })

        // return JSON.stringify(user.userId) == JSON.stringify(userInfo.userId)
        return user.userId === userInfo.userId
      })
      feedItemsWithNicedUser.push({ ...item, nicedUsers, isINiced })
      // console.log({ nicedUserRef })
      // const result = nicedUserRef.data()
      // console.log({ result })
      // feedItemsWithNicedUser.push(result)
    }

    console.warn({ feedItemsWithNicedUser })

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    return { data, cursor: lastVisible }
  } catch ({ message }) {
    alert(message)
  }
}

export const uploadPhotoAsync = async uri => {
  const path = `${collectionName}/${Constants.installationId}}.jpg`
  return uploadPhoto(uri, path)
}

export const post = async ({ text, image: localUri }) => {
  try {
    const { uri: reducedImage, width, height } = await shrinkImageAsync(
      localUri
    )

    const remoteUri = await uploadPhotoAsync(reducedImage)
    collection.add({
      userId: Constants.installationId,
      text,
      timestamp: Date.now(),
      imageWidth: width,
      imageHeight: height,
      image: remoteUri,
      user: userInfo
    })
  } catch ({ message }) {
    alert(message)
  }
}

// TDOO: toggle niceへと名前を変更。
export const toggleNice = async contentId => {
  if (!contentId) return

  try {
    const ref = collection.doc(contentId)

    const nicedUserRef = ref.collection(COLLECTION_NICED_USER)

    const myNice = await nicedUserRef
      .where('userId', '==', userInfo.userId)
      .get()

    const isNicedAlready = !myNice.empty
    if (isNicedAlready) {
      myNice.forEach(x => {
        nicedUserRef.doc(x.id).delete()
      })
    } else {
      nicedUserRef.add({
        userId: userInfo.userId,
        userName: userInfo.userName
      })
    }
  } catch (e) {
    console.error(e)
  }
}

// export const fetchFeedIdById = async id => {
//   try {
//     const querySnapshot = await collection.where(
//       'id',
//       '==',
//       '127632a1-e4a7-426d-b604-eaf25acd24da1582210855622'
//     )
//     querySnapshot.get().then(querySnapshot => {
//       querySnapshot.forEach(doc => {
//         // doc.data() is never undefined for query doc snapshots
//         return doc.id
//         // console.warn(doc.id, ' => ', doc.data())
//       })
//     })
//   } catch (e) {
//     console.warn(e)
//   }
// }
