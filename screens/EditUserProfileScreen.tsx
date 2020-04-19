import React, { useState, useEffect, useContext } from 'react'
import {
  Image,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  ToastAndroid
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Text from '../components/Text.tsx'
import color from '../assets/color'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { headerTextOfEditProfileScreen, changeProfileImageText, textInputNameLabelText} from '../assets/constant/text.ts'
import getPermission from '../utils/getPermission'
import store from '../store/store.ts'
import { uploadUserInfosAsync } from '../firebase/UserFireStore.ts'
import { Context } from '../state/Store'
import {SET_USER_NAME, SET_USER_ICON} from '../state/Reducer.ts'

const { width } = Dimensions.get('window')
const options = { allowsEditing: true }

export default (props: any) => {
  const [_name, setName] = useState('')
  const [_isLoading, setIsLoading] = useState(true)
  const [_userIcon, setUserIcon] = useState(null)

  const {_, dispatch} = useContext(Context)

  useEffect(() => {
    setInitialState()
  }, [])

  const setInitialState = async () => {
    await setName(store.userName)
    await setUserIcon(store.userIconUri)
    await setIsLoading(false)
  }

  const onPressCheck = () => {
    // 本来は、ここに保存の成功の結果をawaitで待たなくてはならない
    uploadUserInfosAsync(_userIcon, _name)
    dispatch({type: 'SET_USER_NAME', payload: _name})
    dispatch({type: 'SET_USER_ICON', payload: _userIcon})
    props.navigation.goBack()
    ToastAndroid.show('保存しました', ToastAndroid.SHORT);
  }

  const onPressChangeProfileImageText = async() => {
    const status = await getPermission(Permissions.CAMERA_ROLL)
    if (!status) return

    const result = await ImagePicker.launchImageLibraryAsync(options)
      
    if (result.cancelled) return

    const imageUri = result.uri
    setUserIcon(imageUri)
  }

  if (_isLoading) return null
  return (
    <View style={S.container}>
      <View style={S.headerContainer}>
        <TouchableOpacity style={S.closeIconContainer} onPress={() => props.navigation.goBack()}>
          <Ionicons
            name={'md-close'}
            size={28}
            color='black'
            />
        </TouchableOpacity>
        <Text style={S.headerText}>{headerTextOfEditProfileScreen}</Text>
        <TouchableOpacity style={S.checkIconContainer} onPress={() => onPressCheck()}>
          <Ionicons
            name={'md-checkmark'}
            size={28}
            color={color.textMaterialBlue}
            />
        </TouchableOpacity>
      </View>

      <View style={S.bodyContainer}>
        <Image source={ _userIcon ? { uri: _userIcon } : require('../assets/human.png')} style={S.userIcon} />
        <TouchableOpacity onPress={() => onPressChangeProfileImageText()}>
          <Text style={S.changeProfileImageText}>{changeProfileImageText}</Text>
        </TouchableOpacity>
        <Text style={S.textInputNameLabelText}>{textInputNameLabelText}</Text>
        <TextInput
            value={_name}
            onChangeText={(text: string) => setName(text)}
            style={S.userNameTextInput}
          />
      </View>
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    width,
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  closeIconContainer: {
    position: 'absolute',
    top: width * 0.02,
    left: width * 0.04
  },
  checkIconContainer: {
    position: 'absolute',
    top: width * 0.02,
    right: width * 0.04,
  },
  headerText: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: width * 0.043,
    top: width * 0.03,
    left: width * 0.17
  },
  userIcon: {
    marginTop: width * 0.05,
    alignSelf: 'center',
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 50
  },
  bodyContainer: {
    paddingHorizontal: width * 0.05
  },
  changeProfileImageText: {
    alignSelf: 'center',
    marginTop: width * 0.05,
    color: color.textMaterialBlue,
    fontSize: width * 0.043,
  },
  textInputNameLabelText: {
    marginTop: width * 0.05,
    color: 'gray',
    fontSize: width * 0.04
  },
  userNameTextInput: {
    borderBottomWidth: 1
  }
})
