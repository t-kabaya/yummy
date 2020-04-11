import firebase from 'firebase'

export const uploadImage = async (uri: string, path: string): Promise<string | null> => {
  if (!uri || !path) return null

  try {
    const storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(path)

    // convert uri to blob
    const response = await fetch(uri)
    const blob = await response.blob()

    await imageRef.put(blob)
    const remoteUri = await imageRef.getDownloadURL()

    return remoteUri
  } catch ({ message }) {
    console.error(message)
    // CARE: must return null, because firestore hate undefined
    return null
  }
}
