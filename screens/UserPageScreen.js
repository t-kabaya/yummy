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
  StatusBar
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { getUserName, saveUserName } from '../asyncStorage/userStorage'
import {
  getUserPosts,
  uploadUserIconAsync,
  getUserOwnIcon
} from '../firebase/Fire'
import getPermission from '../utils/getPermission'

const { width } = Dimensions.get('window')

const options = {
  allowsEditing: true
}

const ListItem = ({ item }) => (
  <View style={S.listItemContainer}>
    <Image source={{ uri: item.image }} style={S.listItemImage} />
    {/* <Text>{JSON.stringify(item)}</Text> */}
  </View>
)

const MyPageScreen = () => {
  const [_name, setName] = useState('')
  const [_isLoading, setIsLoading] = useState(true)
  const [_listData, setListData] = useState([])
  const [_userIcon, setUserIcon] = useState('')

  useEffect(() => {
    setInitialState()
    showUserPosts()
  }, [])

  const setInitialState = async () => {
    const userName = await getUserName()
    setName(userName)
    const icon = await getUserOwnIcon(setUserIcon)
    setUserIcon(icon)
    setIsLoading(false)
  }

  const showUserPosts = async () => {
    const userPosts = await getUserPosts()
    setListData(userPosts)
  }

  const onChangeText = name => {
    setName(name)
    saveUserName(name)
  }

  const onPressIcon = async () => {
    console.log('onPressIcon')
    const status = await getPermission(Permissions.CAMERA_ROLL)
    console.log({ status })
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options)
      console.log({ result })
      if (!result.cancelled) {
        uploadUserIconAsync(result.uri)
        // this.props.navigation.navigate('NewPost', { image: result.uri })
      }
    }
  }

  if (_isLoading) return null
  return (
    <View style={S.container}>
      <View>
        <TouchableOpacity onPress={() => onPressIcon()}>
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
          <TextInput
            value={_name}
            onChangeText={text => onChangeText(text)}
            style={S.userNameText}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={S.listContainer}
        data={_listData}
        renderItem={({ item }) => <ListItem item={item} />}
        numColumns={3}
      />
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    // flexDirection: 'col'
  },
  userNameText: {
    marginLeft: 5,
    fontSize: 15
  },
  listItemContainer: {
    width: width / 3
  },
  listContainer: {
    marginTop: 15
  },
  listItemImage: {
    width: width / 3 - 1,
    height: width / 3 - 1
  },
  userIcon: {
    height: 100,
    width: 100,
    borderRadius: 50
  }
})

export default MyPageScreen
