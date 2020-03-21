import React, { useState, useEffect } from 'react'
import {
  Image,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  StatusBar,
  TouchableHighlight
} from 'react-native'
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import color from '../assets/color'
import { editUserProfileText,headerTextOfEditProfileScreen, changeProfileImageText, textInputNameLabelText} from '../assets/constant/text.ts'

const { width } = Dimensions.get('window')

export default (props) => {
  const [_name, setName] = useState('')
  const [_isLoading, setIsLoading] = useState(true)
  const [_listData, setListData] = useState([])
  const [_userIcon, setUserIcon] = useState('')

  useEffect(() => {
    // setInitialState()
    // showUserPosts()
  }, [])

  const onPressCheck = () => {
    props.navigation.goBack()
  }

  // if (_isLoading) return null
  return (
    <View style={S.container}>
      <View style={S.headerContainer}>
        <TouchableOpacity onPress={props.navigation.goBack}>
          <Ionicons
            style={S.closeIcon}
            name={'md-close'}
            size={28}
            color='black'
            />
        </TouchableOpacity>
        <Text style={S.headerText}>{headerTextOfEditProfileScreen}</Text>
        <TouchableOpacity onPress={onPressCheck}>
          <Ionicons
            style={S.checkIcon}
            name={'md-checkmark'}
            size={28}
            color={color.textMaterialBlue}
            />
        </TouchableOpacity>
      </View>

      <View style={S.bodyContainer}>
        <Image source={require('../assets/human.png')} style={S.userIcon} />
        <TouchableOpacity>
          <Text style={S.changeProfileImageText}>{changeProfileImageText}</Text>
        </TouchableOpacity>
        <Text style={S.textInputNameLabelText}>{textInputNameLabelText}</Text>
        <TextInput
            value={_name}
            onChangeText={text => setName(text)}
            style={S.userNameTextInput}
          />
      </View>
      {/* <TouchableOpacity onPress={() => onPressIcon()}>
          {_userIcon ? (
            <Image source={{ uri: _userIcon }} style={S.userIcon} />
          ) : (
            <MaterialIcons
              style={{ backgroundColor: 'transparent' }}
              name={'account-circle'}
              color={'gray'}
              size={110}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          // <TextInput
          //   value={_name}
          //   onChangeText={text => onChangeText(text)}
          //   style={S.userNameText}
          // />
        </TouchableOpacity> */}
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // backgroundColor: 'green'
    // flexDirection: 'col',
  },
  headerContainer: {
    // position: 'absolute',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // alignSelf: 'center',
    width,
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  closeIcon: {
    position: 'absolute',
    top: width * 0.02,
    left: width * 0.04
    // backgroundColor: 'green',
    // width: 30
  },
  checkIcon: {
    position: 'absolute',
    top: width * 0.02,
    right: width * 0.06,
    // flex: 1,
    // backgroundColor: 'red'
  },
  headerText: {
    position: 'absolute',
    // flex: 5,
    fontWeight: 'bold',
    fontSize: width * 0.043,
    // backgroundColor: 'blue',
    top: width * 0.03,
    left: width * 0.17
  },
  userIcon: {
    marginTop: width * 0.05,
    alignSelf: 'center',
    width: width * 0.25,
    height: width * 0.25
  },
  bodyContainer: {
    // alignItems: 'center'
  },
  changeProfileImageText: {
    alignSelf: 'center',
    marginTop: width * 0.05,
    color: color.textMaterialBlue,
    fontSize: width * 0.043
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
