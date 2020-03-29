import React, { useState, useEffect } from 'react'
import {
  Image,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  StatusBar,
  TouchableHighlight
} from 'react-native'
import Text from '../components/Text.tsx'
import { MaterialIcons } from '@expo/vector-icons'
import { getUserName } from '../asyncStorage/userStorage'
import {
  getUserPosts,
  uploadUserInfosAsync,
  getUserOwnIcon
} from '../firebase/Fire'
import getPermission from '../utils/getPermission'
import color from '../assets/color'
import { editUserProfileText } from '../assets/constant/text.ts'
import store from '../store/store'

const { width } = Dimensions.get('window')

const ListItem = ({ item }) => (
  <View style={S.listItemContainer}>
    <Image source={{ uri: item.image }} style={S.listItemImage} />
  </View>
)

export default props => {
  const [_name, setName] = useState('')
  const [_isLoading, setIsLoading] = useState(true)
  const [_userPosts, setUserPosts] = useState([])
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
    setUserPosts(userPosts)
  }

  const onPressEditProfileButton = () => {
    store.userName = _name
    store.userIconUri = _userIcon
    props.navigation.navigate('EditUserProfileScreen')
  }

  if (_isLoading) return null
  return (
    <View style={S.container}>
      <View>
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
        <Text style={S.userNameText}>{_name}</Text>
      </View>
      <TouchableOpacity onPress={onPressEditProfileButton}>
        <View style={S.editProfileButtonContainer}>
          <Text style={S.editProfileButtonText}>{editUserProfileText}</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        style={S.listContainer}
        data={_userPosts}
        renderItem={({ item }) => <ListItem item={item} />}
        numColumns={3}
      />
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: color.profileBack
    // flexDirection: 'col',
  },
  userNameText: {
    marginTop: width * 0.05,
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
  },
  editProfileButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'gray',
    marginTop: width * 0.07
  },
  editProfileButtonText: {
    fontSize: width * 0.03,
    fontWeight: 'bold'
  }
})
