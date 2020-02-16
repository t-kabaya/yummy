import * as ImageManipulator from 'expo-image-manipulator'

const reduceImageAsync = uri =>
  ImageManipulator.manipulateAsync(uri, [{ resize: { width: 500 } }], {
    compress: 0.5
  })

export default reduceImageAsync
