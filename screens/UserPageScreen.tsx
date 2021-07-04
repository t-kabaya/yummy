import React, { useState, useEffect, useContext } from 'react'
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar
} from 'react-native'
import Text from '../components/Text'
import { getUserName, getUserOwnIcon, getUserPosts } from '../firebase/UserFireStore'
import color from '../assets/color'
import { editUserProfileText } from '../assets/constant/text'
import store from '../store/store'
import { widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { Context } from '../state/Store'

export default (props: any) => {
  const [ _isLoading, setIsLoading ] = useState(true)
  const [ _userPosts, setUserPosts ] = useState([])

  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    setInitialState()
    showUserPosts()
  }, [])

  const setInitialState = async (): Promise<void> => {
    const userName = await getUserName()
    const icon = await getUserOwnIcon()
    dispatch({ type: 'SET_USER_ICON', payload: icon })
    dispatch({ type: 'SET_USER_NAME', payload: userName })
    setIsLoading(false)
  }

  const showUserPosts = async (): Promise<void> => {
    const userPosts = await getUserPosts()
    setUserPosts(userPosts)
  }

  const onPressEditProfileButton = (): void => {
    store.userName = state.userName
    store.userIconUri = state.userIcon
    props.navigation.navigate('EditUserProfileScreen')
  }

  if (_isLoading) return null
  return (
    <View style={S.container}>
      <View>
        {state.userIcon ? (
          <Image source={{ uri: state.userIcon }} style={S.userIcon} />
        ) : (
          <Image source={require('../assets/human.png')} style={S.humanIcon} />
        )}
        <Text style={S.userNameText}>{state.userName}</Text>
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
