import { collection, SUBCOLLECTION_COMMENT, now } from './Fire'
import userInfo from '../utils/userInfo'
import { getUserName } from '../asyncStorage/userStorage'
import { _getUserOwnIcon } from './UserFireStore'

export const getComment = async (contentId: string, cb: (comments: any[]) => void): Promise<any[] | undefined> => {
  try {
    const commentRef = collection
      .doc(contentId)
      .collection(SUBCOLLECTION_COMMENT)
      .orderBy('createdAt', 'desc')

    commentRef.onSnapshot((querySnapshot: any) => {
      const comments: any[] = []
      querySnapshot.forEach((doc: any) => comments.push(doc.data()))
      cb(comments)
    })
  } catch ({ message }) {
    console.error(message)
    return []
  }
}

export const postComment = async (contentId: string, comment: string) => {
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