import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { increaseNiceCount } from '../firebase/Fire'

const profileImageSize = 36
const padding = 12

const Item = props => {
  const [_width, setWidth] = useState(null)
  const [_height, setHeight] = useState(null)

  useEffect(() => {
    if (props.imageWidth) {
      // Get the size of the web image
      Image.getSize(props.image, (width, height) => {
        setWidth(width)
        setHeight(height)
      })
    }
  }, [])

  const {
    contentId,
    text,
    name,
    imageWidth,
    imageHeight,
    uid,
    image,
    niceCount
  } = props

  // Reduce the name to something
  const imgW = imageWidth || _width
  const imgH = imageHeight || _height
  const aspect = imgW / imgH || 1

  return (
    <View>
      <View style={[S.row, S.padding]}>
        <View style={S.row}>
          <Image style={S.avatar} source={{ uri: image }} />
          <Text style={S.text}>{name}</Text>
        </View>
        <Ionicons style={S.icon} name={'ios-more'} size={26} color='black' />
      </View>

      <Image
        resizeMode='contain'
        style={S.image(aspect)}
        source={{ uri: image }}
      />
      <View style={S.padding}>
        <View style={S.row}>
          <View style={S.row}>
            <TouchableHighlight
              onPress={() => increaseNiceCount(contentId, niceCount)}
            >
              <Ionicons
                style={S.icon}
                name={'ios-heart-empty'}
                size={26}
                color='black'
              />
            </TouchableHighlight>
            <Ionicons
              style={S.icon}
              name={'ios-chatbubbles'}
              size={26}
              color='black'
            />
            <Ionicons
              style={S.icon}
              name={'ios-send'}
              size={26}
              color='black'
            />
          </View>
          <Ionicons
            style={S.icon}
            name={'ios-bookmark'}
            size={26}
            color='black'
          />
        </View>

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
