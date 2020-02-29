import React from 'react'
import { Image, TextInput, View, Text, StyleSheet } from 'react-native'

const MyPageScreen = () => {
  return (
    <View style={S.container}>
      <Text>my page</Text>
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row'
  }
})

export default MyPageScreen
