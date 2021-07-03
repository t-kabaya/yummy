import React, { useState, useEffect, useRef } from 'react'
import {
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
  Animated
} from 'react-native'
import Text from '../components/Text.tsx'
import { toggleNice } from '../firebase/NiceFireStore'
import store from '../store/store'
import * as Animatable from 'react-native-animatable'
import DoubleTap from '../components/DoubleTap'
const AnimatableIonicons = Animatable.createAnimatableComponent(Ionicons)

const profileImageSize = 36

export default (props: any) => {
  const {
    contentId,
    text,
    imageWidth,
    imageHeight,
    image,
    isNiced,
    nicedUsers,
    userName,
    userIcon
  } = props.item
  const { navigation } = props
  
  const [_width, setWidth] = useState(null)
  const [_height, setHeight] = useState(null)
  const [_isNiced, setIsNiced] = useState(false)
  const animatedValue = useRef(new Animated.Value(0)).current
  
  useEffect(() => {
    setIsNiced(isNiced)

    if (props.imageWidth) {
      // Get the size of the web image
      Image.getSize(props.image, (width: number, height: number) => {
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

    displayBigHeartAnimation()
  }

  const showInPreparationMessage = () => {
    Alert.alert('この機能は開発中です')
  }

  const sendReport = () => {
    Alert.alert(
      '不適切な投稿ですか？',
      '',
      [
        { text: 'はい', onPress: () => Alert.alert('ご報告ありがとうございます。')},
        { text: 'いいえ' }
      ],
      { cancelable: false }
    )
  }

  const onPressCommentIcon = () => {
    store.currentContentId = contentId
    navigation.navigate('PostCommentScreen')
  }

  // const animatedValue = useRef(new Animated.Value(0.5)).current

  const displayBigHeartAnimation = () => {    
    if (_isNiced) return    
    Animated.sequence([
      Animated.spring(animatedValue, { toValue: 1 }),
      Animated.spring(animatedValue, { toValue: 0 })
    ]).start()
  }

  const renderHeartAnimation = () => {
    const imageStyles = [
      S.overlayHeart,
      {zIndex: 1},
      {
        opacity: animatedValue,
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1.5],
            }),
          },
        ],
      },
    ]

    return (
      <View style={S.overlay}>
        <Animated.Image
          source={require('../assets/images/heart.png')}
          style={imageStyles}
        />
      </View>
    )
  }

  return (
    <React.Fragment>
      <View style={[S.row, S.padding]}>
        <TouchableWithoutFeedback onPress={showInPreparationMessage}>
          <View style={S.row}>
            <Image
              style={S.avatar}
              source={
                userIcon ? { uri: userIcon } : require('../assets/human.png')
              }
              />
            <Text style={S.text}>{userName}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={sendReport}>
          <View style={S.iconContainer}>
            <Ionicons
              style={S.icon}
              name={'ios-ellipsis-vertical-sharp'}
              size={26}
              color='black'
              />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {renderHeartAnimation()}
      <DoubleTap onDoubleTap={onPressNice}>
        <Image
          resizeMode='contain'
          style={S.image(aspect)}
          source={{ uri: image }}
        />
      </DoubleTap>

      <View style={S.padding}>
        <View style={S.row}>
          <View style={S.row}>
            <TouchableWithoutFeedback onPress={onPressNice}>
              <View style={S.iconContainer}>
                <AnimatableIonicons animation="rubberBand" easing="ease-out" 
                  style={S.icon}
                  name={_isNiced ? 'ios-heart' : 'ios-heart-outline'}
                  size={30}
                  color={_isNiced ? 'red' : 'black'}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPressCommentIcon}>
              <View style={S.iconContainer}>
                <Image source={require('../assets/images/kabaCommentIcon.png')} style={S.commentIcon} fadeDuration={0} />
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
        <View style={S.descriptionContainer}>
          {nicedUsers?.[0] && (
            <Text>「いいね！」した人： {nicedUsers[0].userName}　さん他</Text>
          )}
          <Text style={S.subtitle}>{text}</Text>
        </View>
      </View>
    </React.Fragment>
  )
}

const S = StyleSheet.create({
  text: {
    fontWeight: '600'
  },
  subtitle: {
    opacity: 0.8,
    letterSpacing: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  padding: {
    padding: 12
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
    marginRight: 12
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
  }),

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  heartIcon: {
    width: 20,
    height: 20
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  overlayHeart: {
    tintColor: 'white'
  },
  descriptionContainer: {
    maxHeight: 300,
  },
  commentIcon: {
    height: 24,
    width: 24
  }
})
