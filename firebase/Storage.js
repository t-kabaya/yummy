import firebase from 'firebase'

export const uploadImage = async (uri, path) => {
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
    return null
  }
}
