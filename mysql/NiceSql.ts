export const toggleNice = async (postId: string): Promise<void> => {
	if (!postId) return
      
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