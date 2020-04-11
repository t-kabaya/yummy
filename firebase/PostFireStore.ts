import { collection, now, SUBCOLLECTION_NICED_USER, uploadPhotoAsync } from './Fire'
import Constants from 'expo-constants'
import userInfo from '../utils/userInfo'
import shrinkImageAsync from '../utils/shrinkImageAsync'
import { getUserName } from '../asyncStorage/userStorage'
import { _getUserOwnIcon } from './UserFireStore'

export const getPaged = async ({ size, start }: {size: number, start: number}) => {
  let feedRef = collection.orderBy('timestamp', 'desc').limit(size)
  try {
    if (start) {
      feedRef = feedRef.startAfter(start)
    }

    const querySnapshot = await feedRef.get()
    const feedData: any[] = []
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
        feedData.push(reduced)
      }
    })

    const feedItemsWithNicedUser = []
    // fetch data from subCollections
    for (item of feedData) {
      const nicedUsers: any[] = []
      const nicedUserRef = await collection
        .doc(item.key)
        .collection(SUBCOLLECTION_NICED_USER)
        .get()

      // nicedUserRef size always 1.
      nicedUserRef.forEach((doc: any) => {
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
      const userIcon = await _getUserOwnIcon()
      itemsWithNicedUserAndUserIcon.push({ ...item, userIcon })
    }

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    return { posts: itemsWithNicedUserAndUserIcon, cursor: lastVisible }
  } catch ({ message }) {
    console.error(message)
  }
}

export const post = async ({ text, image: localUri }: {text: string, image: string}): Promise<void> => {
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
