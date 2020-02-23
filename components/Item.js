import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import { toggleNice } from '../firebase/Fire'

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
    nicedUsers
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

  return (
    <View>
      <View style={[S.row, S.padding]}>
        <View style={S.row}>
          <Image style={S.avatar} source={{ uri: image }} />
          <Text style={S.text}>{name}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => showInPreparationMessage()}>
          <Ionicons style={S.icon} name={'ios-more'} size={26} color='black' />
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
            <TouchableWithoutFeedback onPress={() => onPressNice()}>
              <Ionicons
                style={S.icon}
                name={_isNiced ? 'ios-heart' : 'ios-heart-empty'}
                size={26}
                color={_isNiced ? 'red' : 'black'}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => showInPreparationMessage()}
            >
              <Ionicons
                style={S.icon}
                name={'ios-chatbubbles'}
                size={26}
                color='black'
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => showInPreparationMessage()}
            >
              <Ionicons
                style={S.icon}
                name={'ios-send'}
                size={26}
                color='black'
              />
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={() => showInPreparationMessage()}>
            <Ionicons
              style={S.icon}
              name={'ios-bookmark'}
              size={26}
              color='black'
            />
          </TouchableWithoutFeedback>
        </View>

        {nicedUsers && nicedUsers[0] && (
          <Text>「いいね！」した人： {nicedUsers[0].userName}　さん他</Text>
        )}

        <Text style={S.text}>{name}</Text>
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
  icon: {
    marginRight: 8
  },
  image: aspect => ({
    backgroundColor: '#D8D8D8',
    width: '100%',
    aspectRatio: aspect
  })
})

export default Item
