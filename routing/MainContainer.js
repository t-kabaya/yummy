import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import RootRoute from './RootRoute'
import RegisterScreen from '../screens/RegisterScreen'
import { getUserName, clearAsyncStorage } from '../asyncStorage/userStorage'

const MainContainer = () => {
  const [_isLoading, setIsLoading] = useState(true)
  const [_isFirstLaunch, setIsFirstLaunch] = useState(true)

  useEffect(() => {
    setInitialState()
  }, [])

  const setInitialState = async () => {
    const userName = await getUserName()
    const isFirstLounch = userName === null
    await setIsFirstLaunch(isFirstLounch)
    setIsLoading(false)
  }

  const goToHome = () => setIsFirstLaunch(false)

  if (_isLoading) return null
  return (
    <View style={S.container}>
      {_isFirstLaunch ? <RegisterScreen goToHome={goToHome} /> : <RootRoute />}
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default MainContainer
