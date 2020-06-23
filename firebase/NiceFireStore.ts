import { postCollection, SUBCOLLECTION_NICED_USER } from './Fire'
import userInfo from '../utils/userInfo'
import { getUserName } from './UserFireStore'

export const toggleNice = async (contentId: string): Promise<void> => {
  if (!contentId) return

  try {
    const ref = postCollection.doc(contentId)

    const nicedUserRef = ref.collection(SUBCOLLECTION_NICED_USER)

    const myNice = await nicedUserRef
      .where('userId', '==', userInfo.userId)
      .get()

    const userName: string = await getUserName()

    const isNicedAlready: boolean = !myNice.empty
    if (isNicedAlready) {
      myNice.forEach((x: any) => {
        nicedUserRef.doc(x.id).delete()
      })
    } else {
      nicedUserRef.add({
        userId: userInfo.userId,
        userName
      })
    }
  } catch ({ message }) {
    console.error(message)
  }
}