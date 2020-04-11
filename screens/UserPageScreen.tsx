import React, { useState, useEffect } from 'react'
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar
} from 'react-native'
import Text from '../components/Text.tsx'
import { getUserName } from '../firebase/UserFireStore.ts'
import {
  getUserPosts,
  getUserOwnIcon
} from '../firebase/Fire'
import color from '../assets/color'
import { editUserProfileText } from '../assets/constant/text.ts'
import store from '../store/store'
import { widthPercentageToDP as wp} from 'react-native-responsive-screen'

export default props => {
  const [_name, setName] = useState('')
  const [_isLoading, setIsLoading] = useState(true)
  const [_userPosts, setUserPosts] = useState([])
  const [_userIcon, setUserIcon] = useState('')

  useEffect(() => {
    setInitialState()
    showUserPosts()
  }, [])

  const setInitialState = async (): Promise<void> => {
    const userName = await getUserName(setName)
    setName(userName)
    const icon = await getUserOwnIcon(setUserIcon)
    setUserIcon(icon)
    setIsLoading(false)
  }

  const showUserPosts = async (): Promise<void> => {
    const userPosts = await getUserPosts()
    setUserPosts(userPosts)
  }

  const onPressEditProfileButton = (): void => {
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
          <Image source={require('../assets/human.png')} style={S.humanIcon} />
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
        renderItem={({ item }) => 
          <View style={S.listItemContainer}>
            <Image source={{ uri: item.image }} style={S.listItemImage} />
          </View>
        }
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
  },
  userNameText: {
    marginTop: wp('5%'),
    marginLeft: 5,
    fontSize: 15
  },
  listItemContainer: {
    width: wp('33%')
  },
  listContainer: {
    marginTop: 15
  },
  listItemImage: {
    width: wp('32%'),
    height: wp('32%')
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
    width: wp('90%'),
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'gray',
    marginTop: wp('7%')
  },
  editProfileButtonText: {
    fontSize: wp('3%'),
    fontWeight: 'bold'
  },
  humanIcon: {
    width: wp('18%'),
    height: wp('18%')
  }
})
