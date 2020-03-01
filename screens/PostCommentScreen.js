import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  Image
} from 'react-native'
import {
  getUserName,
  saveUserName,
  clearAsyncStorage
} from '../asyncStorage/userStorage'
import { saveComment } from '../firebase/Fire'

const { height, width } = Dimensions.get('window')

const imageUri =
  'https://pbs.twimg.com/profile_images/1009220670826295297/qfHNpNPM_400x400.jpg'
const mockComments = [
  {
    userName: 'hasimoto kannna',
    comment:
      '亜種名 familiaris はやはりラテン語で、「家庭に属する」といった意味。また、英語: familiar、フランス語: familier など「慣れ親しんだ」を意味する現代語の語源でもある。'
  },
  {
    userName: 'hasimoto kannna',
    comment:
      '亜種名 familiaris はやはりラテン語で、「家庭に属する」といった意味。また、英語: familiar、フランス語: familier など「慣れ親しんだ」を意味する現代語の語源でもある。'
  },
  {
    userName: 'hasimoto kannna',
    comment:
      '亜種名 familiaris はやはりラテン語で、「家庭に属する」といった意味。また、英語: familiar、フランス語: familier など「慣れ親しんだ」を意味する現代語の語源でもある。'
  }
]

const Item = ({ item }) => (
  <View style={S.commentContainer}>
    <Image source={{ uri: imageUri }} style={S.userIcon} />
    <Text style={S.commentText}>
      <Text style={S.userName}>{item.userName}</Text> {item.comment}
    </Text>
  </View>
)

const PostCommentScreen = ({ goToHome }) => {
  const [_name, setName] = useState('')

  const onPressDicision = () => {
    saveUserName(_name)
    goToHome()
  }

  const onPressPost = () => {
    saveComment('DCObMekOfxUtEzuQg6hS', 'Niceeee')
  }

  return (
    <KeyboardAvoidingView
      style={S.container}
      behavior='padding'
      // keyboardAvoidingViewは、日本語の予測UI分下に下がる。workaroundとして、適当な数字の100を入れた。
      // この数字は端末ごとに変わる。
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={mockComments}
        renderItem={({ item }) => <Item item={item} />}
      />
      <View style={S.textInputContainer}>
        <Image
          source={require('../assets/human.png')}
          style={S.userImagenearByTextInput}
        />
        <TextInput
          style={S.textInput}
          onChangeText={name => setName(name)}
          value={_name}
          autoFocus
          placeholder='コメントを追加...'
        />
        <TouchableWithoutFeedback onPress={onPressPost}>
          <View style={S.decisionButtonContainer}>
            <Text style={S.decisionButtonText}>投稿する</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  )
}

const horizontalPadding = 0.03

const S = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  commentContainer: {
    margin: width * 0.03,
    flexDirection: 'row',
    width: width * (1 - 0.03 * 2)
    // backgroundColor: 'green'
  },
  userIcon: {
    borderRadius: 50,
    // marginLeft: width * 0.03,
    // marginHorizontal: width * 0.03,
    height: width * 0.18,
    width: width * 0.18
  },
  textInputContainer: {
    flexDirection: 'row'
  },
  userName: {
    fontWeight: 'bold'
  },
  commentText: {
    marginRight: width * 0.2,
    marginLeft: width * 0.02
  },
  userImagenearByTextInput: {
    height: width * 0.1,
    width: width * 0.1,
    // marginRight: width * 0.1,
    marginHorizontal: width * 0.05
  },

  textInput: {
    height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    width: width * 0.6
    // backgroundColor: '#e8e8e8',
    // borderRadius: 10
  },
  decisionButtonContainer: {
    height: 40,
    width: width * 0.2,
    // backgroundColor: 'rgb(100,152,237)',
    borderRadius: 10,
    // marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5
  },
  decisionButtonText: {
    // color: 'white',
    fontSize: 13,
    color: 'rgb(100,152,237)',
    letterSpacing: 2
  }
})

export default PostCommentScreen
