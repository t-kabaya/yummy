import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, TextInput, View, StyleSheet, Text, StatusBar, Platform } from 'react-native'
import HeaderButtons from 'react-navigation-header-buttons'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'

import { post } from '../firebase/PostFireStore'

export default class NewPostScreen extends React.Component<Props> {
  // static navigationOptions = ({ navigation }) => ({
  //   title: '新しい投稿',
  //   headerRight: (
  //     <HeaderButtons IconComponent={Ionicons} iconSize={23} color='black'>
  //       <HeaderButtons.Item
  //         title='シェア'
  //         onPress={() => {
  //           const text = navigation.getParam('text')
  //           const image = navigation.getParam('image')
  //           if (text && image) {
  //             navigation.goBack()
  //             post({ text: text.trim(), image })
  //             navigation.navigate('Feed')
  //           } else {
  //             alert('説明文がありません')
  //           }
  //         }}
  //       />
  //     </HeaderButtons>
  //   )
  // })

  state = { text: '' }

  render () {
    // const { image } = this.props.navigation.state.params
    const image = ''
    return (
      <View style={S.container}>
        <View style={S.headerContainer}>
          <Text style={S.headerTitleText}>新しい投稿</Text>
          <Text style={S.shareText}>シェア</Text>
        </View>
        <Image
          source={{ uri: image }}
          style={S.image}
        />
        <TextInput
          multiline
          style={S.textInput}
          placeholder='説明文'
          onChangeText={text => {
            this.setState({ text })
            this.props.navigation.setParams({ text })
          }}
        />
      </View>
    )
  }
}

const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    // padding: 10,
  },
  headerContainer: {
    width: wp('100%'),
    height: wp('14%'),
    borderBottomWidth: 1
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  shareText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  image: {
    resizeMode: 'contain',
    aspectRatio: 1,
    width: 72
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16
  }
})
