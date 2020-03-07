import React, { useState, useEffect } from 'react'
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
import { getComment, postComment } from '../firebase/Fire'
import store from '../store/store'

const { height, width } = Dimensions.get('window')

const Item = ({ item }) => (
  <View style={S.commentContainer}>
    <Image source={require('../assets/human.png')} style={S.userIcon} />
    <Text style={S.commentText}>
      <Text style={S.userName}>{item.userName}</Text> {item.comment}
    </Text>
  </View>
)

const PostCommentScreen = ({ goToHome }) => {
  const [_textInputValue, setTextInputValue] = useState('')
  const [_isLoading, setIsLoading] = useState(true)
  const [_comments, setComments] = useState([])

  useEffect(() => {
    setInitialState()
  }, [])

  const setInitialState = async () => {
    const comments = await getComment(store.currentContentId, comment =>
      // console.log('callback')
      setComments(comment)
    )
    console.log({ commeentInSetInitialState: comments })
    setComments(comments)
    setIsLoading(false)
  }

  const onPressDicision = () => {
    saveUserName(_textInputValue)
    goToHome()
  }

  const onPressPost = () => {
    console.log('onPressPost')
    postComment(store.currentContentId, _textInputValue)
    setTextInputValue('')
  }

  return (
    <KeyboardAvoidingView
      style={S.container}
      behavior='padding'
      // CARE: keyboardAvoidingViewは、日本語の予測UI分下に下がる。workaroundとして、適当な数字の100を入れた。
      // この数字は端末ごとに変わる。
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={_comments}
        renderItem={({ item }) => <Item item={item} />}
      />
      <View style={S.textInputContainer}>
        <Image
          source={require('../assets/human.png')}
          style={S.userImagenearByTextInput}
        />
        <TextInput
          style={S.textInput}
          onChangeText={text => setTextInputValue(text)}
          value={_textInputValue}
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
  },
  userIcon: {
    borderRadius: 50,
    height: width * 0.1,
    width: width * 0.1,
    marginRight: width * 0.01
  },
  textInputContainer: {
    flexDirection: 'row'
  },
  userName: {
    fontWeight: 'bold'
  },
  commentText: {
    fontSize: width * 0.04,
    marginRight: width * 0.2,
    marginLeft: width * 0.02,
    marginTop: width * 0.01
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
