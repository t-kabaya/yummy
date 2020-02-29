import React, { useState, useEffect } from 'react'
import {
  Image,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { getUserName, saveUserName } from '../asyncStorage/userStorage'

const MyPageScreen = () => {
  const [_name, setName] = useState('')
  const [_isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setInitialState()
  }, [])

  setInitialState = async () => {
    const userName = await getUserName()
    console.log({ userName })
    setName(userName)
    setIsLoading(false)
  }

  const onChangeText = name => {
    setName(name)
    saveUserName(name)
  }

  if (_isLoading) return null
  return (
    <View style={S.container}>
      <View>
        <TouchableOpacity onPress={() => Alert.alert('この機能は準備中です')}>
          <MaterialIcons
            style={{ backgroundColor: 'transparent' }}
            name={'account-circle'}
            color={'gray'}
            size={110}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <TextInput value={_name} onChangeText={text => onChangeText(text)} />
        </TouchableOpacity>
      </View>
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
