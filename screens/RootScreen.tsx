import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet} from 'react-native'
import * as Font from 'expo-font'
import RootRoute from '../routing/RootRoute'
import Store from '../state/Store'
console.disableYellowBox = true

export default () => {
  const [_isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setInitialState()
  }, [])

  const setInitialState = async () => {
    await Font.loadAsync({
      notosans: require('../assets/fonts/NotoSansJP-Regular.ttf')
    })
    setIsLoading(false)
  }

  if (_isLoading) return null
  return (
    <SafeAreaView style={S.container}>
      <Store>
        <RootRoute />
      </Store>
    </SafeAreaView>
  )
}

const S = StyleSheet.create({
  container: {
    flex: 1
  }
})
