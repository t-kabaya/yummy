import { collection, SUBCOLLECTION_NICED_USER } from './Fire'
import userInfo from '../utils/userInfo'
import { getUserName } from '../asyncStorage/userStorage'
import { _getUserOwnIcon } from './UserFireStore'

export const toggleNice = async (contentId: string) => {
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
      myNice.forEach((x: any) => {
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