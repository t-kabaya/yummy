import firebase from 'firebase'

const uploadPhoto = (uri, uploadUri) => {
  try {
    new Promise(async (res, rej) => {
      const response = await fetch(uri)
      const blob = await response.blob()
      console.log({ blob })

      const ref = firebase.storage().ref(uploadUri)
      const unsubscribe = ref.put(blob).on(
        'state_changed',
        state => {},
        err => {
          unsubscribe()
          rej(err)
        },
        async () => {
          unsubscribe()
          const url = await ref.getDownloadURL()
          res(url)
        }
      )
    })
  } catch ({ message }) {
    console.error(message)
  }
}

export const uploadImage = async (path, uri) => {
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

export default uploadPhoto
