import { deviceId, deviceName, platform } from 'expo-constants'

const getUserInfo = () => ({
  deviceId,
  deviceName,
  platform
})

export default getUserInfo
