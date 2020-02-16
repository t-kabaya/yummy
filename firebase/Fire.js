import userInfo from '../utils/getUserInfo'
import shrinkImageAsync from '../utils/shrinkImageAsync'
import uploadPhoto from '../utils/uploadPhoto'
import Constants from 'expo-constants'

const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

const collectionName = 'snack-SJucFknGX'

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
      text,
      userId: Constants.installationId,
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
