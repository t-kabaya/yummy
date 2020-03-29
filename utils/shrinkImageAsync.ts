import { manipulateAsync } from 'expo-image-manipulator'

export default (uri: string): any =>
  manipulateAsync(uri, [{ resize: { width: 500 } }], {
    compress: 0.5
  })
