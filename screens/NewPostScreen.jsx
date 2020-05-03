import React, { useState, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image, TextInput, View, StyleSheet, Text, StatusBar, Platform, TouchableOpacity, Alert } from 'react-native'
import HeaderButtons from 'react-navigation-header-buttons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Container, Header, Content, Accordion, Left, Right, Body } from "native-base"
import { shareText, newPostScreenTitle, fillCaptionText, noCaptionText } from '../assets/constant/text.ts'
import Color from '../assets/color'
import { post } from '../firebase/PostFireStore'
import { Context } from '../state/Store.tsx'

export default (props) => {
  const {state, dispatch} = useContext(Context)

  const [ caption, setCaption ] = useState('')
  
  const { navigation } = props
  const image = navigation.getParam('image')

  const onPressShare = async () => {
    if (caption && image) {
      const newPost = await post({ text: caption.trim(), image })
      dispatch({type: 'POST_FEED', payload: newPost})
      navigation.navigate('FeedScreen')
    } else {
      Alert.alert(noCaptionText)
    }
  }
  
  return (
    <View style={S.container}>
      <Header style={S.header}>
        <Left>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={32} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={S.headerTitleText}>{newPostScreenTitle}</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={onPressShare}>
            <Text style={S.shareText}>{shareText}</Text>
          </TouchableOpacity>
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
          onChangeText={caption => setCaption(caption)}
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
