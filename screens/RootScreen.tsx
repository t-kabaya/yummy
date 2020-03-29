import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet} from 'react-native'
import * as Font from 'expo-font'
import RootRoute from '../routing/RootRoute'
import RegisterScreen from './RegisterScreen'
import { getUserName } from '../asyncStorage/userStorage'
console.disableYellowBox = true

export default () => {
  const [_isLoading, setIsLoading] = useState(true)
  const [_isFirstLaunch, setIsFirstLaunch] = useState(true)

  useEffect(() => {
    setInitialState()
  }, [])

  const setInitialState = async () => {
    const userName = await getUserName()
    const isFirstLounch = userName === null
    await setIsFirstLaunch(isFirstLounch)
    await Font.loadAsync({
      notosans: require('../assets/fonts/NotoSansJP-Regular.ttf')
    })
    setIsLoading(false)
  }

  const goToHome = () => setIsFirstLaunch(false)

  if (_isLoading) return null
  return (
    <SafeAreaView style={S.container}>
      {_isFirstLaunch ? <RegisterScreen goToHome={goToHome} /> : <RootRoute />}
    </SafeAreaView>
  )
}

const S = StyleSheet.create({
  container: {
    flex: 1
  }
})
