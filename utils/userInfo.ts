import Constants from 'expo-constants'

export default {
  userId: Constants.installationId,
  // ユーザーネームは、一旦deviceNameで代用し、myPageが出来次第、そちらに切り替える。
  userName: Constants.deviceName,
  deviceId: Constants.deviceId,
  deviceName: Constants.deviceName,
  platform: Constants.platform
}
