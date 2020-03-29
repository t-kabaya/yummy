import { Constants } from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Text from '../components/Text.tsx'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import getPermission from '../utils/getPermission'

const options = {
  allowsEditing: true
}

export default props => {
  const selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL)
    if (!status) return

    const result = await ImagePicker.launchImageLibraryAsync(options)
    if (result.cancelled) return

    props.navigation.navigate('NewPost', { image: result.uri })
  }

  const takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA)
    if (!status) return

    const result = await ImagePicker.launchCameraAsync(options)
    if (result.cancelled) return

    props.navigation.navigate('NewPost', { image: result.uri })
  }

  return (
    <View style={S.container}>
      <TouchableOpacity onPress={selectPhoto}>
        <Text style={S.text}>写真を選択</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={takePhoto}>
        <Text style={S.text}>写真を撮る</Text>
      </TouchableOpacity>
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
