import { postCollection, now, SUBCOLLECTION_NICED_USER, uploadPhotoAsync } from './Fire'
import Constants from 'expo-constants'
import userInfo from '../utils/userInfo'
import shrinkImageAsync from '../utils/shrinkImageAsync'
import { getUserName } from '../asyncStorage/userStorage'
import { _getUserOwnIcon } from './UserFireStore'

const PAGE_SIZE = 5

export const getPosts = async () => {
  let feedRef = postCollection.orderBy('timestamp', 'desc').limit(PAGE_SIZE)
  try {
    // if (start) {
    //   feedRef = feedRef.startAfter(start)
    // }

    const querySnapshot = await feedRef.get()
    const feedData: any[] = []
    querySnapshot.forEach((doc: any) => {
      if (doc.exists) {
        const post = doc.data() || {}

        // TODO: use user name
        const name = Constants.deviceName
        const reduced = {
          key: doc.id,
          contentId: doc.id,
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
      const nicedUserRef = await postCollection
        .doc(item.key)
        .collection(SUBCOLLECTION_NICED_USER)
        .get()

      // nicedUserRef size always 1.
      nicedUserRef.forEach((doc: any) => {
        if (doc.exists && doc.data()) nicedUsers.push(doc.data())
      })

      const isNiced = nicedUsers.some(user => user.userId === userInfo.userId)

      feedItemsWithNicedUser.push({
        ...item,
        nicedUsers,
        isNiced
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

export const post = async ({ text, image: localUri }: {text: string, image: string}): Promise<any> => {
  try {
    const { uri: reducedImage, width, height } = await shrinkImageAsync(
      localUri
    )

    let userName = await getUserName()
    if (userName == '') {
      userName = userInfo.userName
    }

    const remoteUri = await uploadPhotoAsync(reducedImage)

    const timestamp = await now()

    const post = {
      userId: userInfo.userId,
      userName,
      user: userInfo,
      text,
      timestamp,
      imageWidth: width,
      imageHeight: height,
      image: remoteUri,
      createdAt: timestamp
    }

    await postCollection.add(post)

    return post
  } catch ({ message }) {
    console.error(message)
  }
}
