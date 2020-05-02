import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image, TextInput, View, StyleSheet, Text, StatusBar, Platform } from 'react-native'
import HeaderButtons from 'react-navigation-header-buttons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Container, Header, Content, Accordion, Left, Right, Body } from "native-base"
import { shareText, newPostScreenTitle, fillCaptionText } from '../assets/constant/text.ts'
import Color from '../assets/color'

import { post } from '../firebase/PostFireStore'

export default (props) => {
  const [ text, setText ] = useState('')
  
  const { navigation } = props
  // const image = navigation.getParam('image's)
  const image = 'https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530799%2F45f6a6bd-36d1-55e6-a7e7-ae4332567f31.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&s=c8a112adb08abf3be00e4e90e93cee8e'

  const onPressShare = () => {
    if (text && image) {
      navigation.goBack()
      post({ text: text.trim(), image })
      navigation.navigate('FeedScreen')
    } else {
      alert('説明文がありません')
    }
  }
  
  return (
    <View style={S.container}>
      <Header style={S.header}>
        <Left>
          <Ionicons name="md-arrow-back" size={32} />
        </Left>
        <Body>
          <Text style={S.headerTitleText}>{newPostScreenTitle}</Text>
        </Body>
        <Right>
          <Text style={S.shareText}>{shareText}</Text>
        </Right>
      </Header>
      
      <View style={S.row}>
        <Image
          source={{ uri: image }}
          style={S.image}
          />
        <TextInput
          multiline
          style={S.textInput}
          placeholder={fillCaptionText}
          onChangeText={caption => setText(caption)}
        />
      </View>
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: wp('100%'),
    backgroundColor: 'white'
  },
  headerContainer: {
    width: wp('100%'),
    height: wp('14%'),
    borderBottomWidth: 1,
    paddingTop: 200
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  shareText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.textMaterialBlue
  },
  image: {
    resizeMode: 'contain',
    aspectRatio: 1,
    width: wp('30%'),
  },
  textInput: {
    paddingHorizontal: 16,
    height: wp('30%')
  },
  row: {
    width: wp('95%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: wp('5%'),
  }
})
