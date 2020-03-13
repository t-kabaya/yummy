import React, { useState, useEffect } from 'react'
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import { toggleNice } from '../firebase/Fire'
import store from '../store/store'

const profileImageSize = 36
const padding = 12

const Item = props => {
  const {
    contentId,
    text,
    name,
    imageWidth,
    imageHeight,
    uid,
    image,
    isINiced,
    nicedUsers,
    user,
    navigation,
    userIcon
  } = props

  const [_width, setWidth] = useState(null)
  const [_height, setHeight] = useState(null)
  const [_isNiced, setIsNiced] = useState(false)

  useEffect(() => {
    setIsNiced(isINiced)

    if (props.imageWidth) {
      // Get the size of the web image
      Image.getSize(props.image, (width, height) => {
        setWidth(width)
        setHeight(height)
      })
    }
  }, [])

  // Reduce the name to something
  const imgW = imageWidth || _width
  const imgH = imageHeight || _height
  const aspect = imgW / imgH || 1

  const onPressNice = () => {
    toggleNice(contentId)
    setIsNiced(!_isNiced)
  }

  const showInPreparationMessage = () => {
    Alert.alert('この機能は開発中です')
  }

  const sendReport = () => {
    Alert.alert(
      '不適切な投稿ですか？',
      '',
      [{ text: 'はい' }, { text: 'いいえ' }],
      {
        cancelable: false
      }
    )
  }

  const onPressCommentIcon = () => {
    store.currentContentId = contentId
    navigation.navigate('PostCommentScreen')
  }

  return (
    <View>
      <View style={[S.row, S.padding]}>
        <TouchableWithoutFeedback onPress={showInPreparationMessage}>
          <View style={S.row}>
            <Image style={S.avatar} source={{ uri: userIcon || image }} />
            <Text style={S.text}>{user.userName || name}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={sendReport}>
          <View style={S.iconContainer}>
            <Ionicons
              style={S.icon}
              name={'ios-more'}
              size={26}
              color='black'
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Image
        resizeMode='contain'
        style={S.image(aspect)}
        source={{ uri: image }}
      />
      <View style={S.padding}>
        <View style={S.row}>
          <View style={S.row}>
            <TouchableWithoutFeedback onPress={onPressNice}>
              <View style={S.iconContainer}>
                <Ionicons
                  style={S.icon}
                  name={_isNiced ? 'ios-heart' : 'ios-heart-empty'}
                  size={30}
                  color={_isNiced ? 'red' : 'black'}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPressCommentIcon}>
              <View style={S.iconContainer}>
                <MaterialCommunityIcons
                  style={{ backgroundColor: 'transparent' }}
                  name={'chat-processing'}
                  color={'black'}
                  size={30}
                />
              </View>
            </TouchableWithoutFeedback>
            {/* <TouchableWithoutFeedback onPress={showInPreparationMessage}>
              <View style={S.iconContainer}>
                <Ionicons
                  style={S.icon}
                  name={'ios-send'}
                  size={30}
                  color='black'
                />
              </View>
            </TouchableWithoutFeedback> */}
          </View>
          {/* <TouchableWithoutFeedback onPress={showInPreparationMessage}>
            <View style={S.iconContainer}>
              <Ionicons
                style={S.icon}
                name={'ios-bookmark'}
                size={30}
                color='black'
              />
            </View>
          </TouchableWithoutFeedback> */}
        </View>

        {nicedUsers && nicedUsers[0] && (
          <Text>「いいね！」した人： {nicedUsers[0].userName}　さん他</Text>
        )}

        <Text style={S.subtitle}>{text}</Text>
      </View>
    </View>
  )
}

const S = StyleSheet.create({
  text: { fontWeight: '600' },
  subtitle: {
    opacity: 0.8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  padding: {
    padding
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: '#D8D8D8',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: 'cover',
    marginRight: padding
  },
  iconContainer: {
    padding: 2
  },
  icon: {
    marginRight: 9,
    marginLeft: 9,
    marginVertical: 3
  },
  image: aspect => ({
    backgroundColor: '#D8D8D8',
    width: '100%',
    aspectRatio: aspect
  })
})

export default Item
