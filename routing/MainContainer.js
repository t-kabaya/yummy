import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import RootRoute from './RootRoute'
import RegisterScreen from '../screens/RegisterScreen'
import { getUserName } from '../asyncStorage/userStorage'

const MainContainer = () => {
  const [_isLoading, setIsLoading] = useState(true)
  const [_isFirstLaunch, setIsFirstLaunch] = useState(true)

  useEffect(async () => {
    setInitialState()
  }, [])

  const setInitialState = async () => {
    const userName = await getUserName()
    const isFirstLounch = !!userName
    await setIsFirstLaunch(isFirstLounch)
    setIsLoading(false)
  }

  if (_isLoading) return null
  return (
    <View style={S.container}>
      {_isFirstLaunch ? <RegisterScreen /> : <RootRoute />}
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default MainContainer
