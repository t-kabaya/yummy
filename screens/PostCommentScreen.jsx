import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  Image
} from 'react-native'
import Text from '../components/Text.tsx'
import {
  saveUserName,
  clearAsyncStorage
} from '../asyncStorage/UserStorage'
import { getComment } from '../firebase/CommentFireStore'
import { postComment } from '../firebase/CommentFireStore.ts'
import { _getUserOwnIcon } from '../firebase/UserFireStore'
import store from '../store/store'

const { height, width } = Dimensions.get('window')

const Item = ({ item }) => (
  <View style={S.commentContainer}>
    <Image source={{ uri: item.userIcon }} style={S.userIcon} />
    <Text style={S.commentText}>
      <Text style={S.userName}>{item.userName}</Text> {item.comment}
    </Text>
  </View>
)

const PostCommentScreen = ({ goToHome }) => {
  const [_textInputValue, setTextInputValue] = useState('')
  const [_isLoading, setIsLoading] = useState(true)
  const [_comments, setComments] = useState([])
  const [_userIcon, setUserIcon] = useState(null)

  useEffect(() => {
    setInitialState()
  }, [])

  const setInitialState = async () => {
    await getComment(store.currentContentId, comment => setComments(comment))
    const userIcon = await _getUserOwnIcon()
    setUserIcon(userIcon)
    setIsLoading(false)
  }

  const onPressDicision = () => {
    saveUserName(_textInputValue)
    goToHome()
  }

  const onPressPost = () => {
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
          source={
            _userIcon ? { uri: _userIcon } : require('../assets/human.png')
          }
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
    flexDirection: 'row',
    borderTopWidth: 0.5,
    paddingTop: width * 0.03
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
    marginHorizontal: width * 0.05,
    borderRadius: 50
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
    alignItems: 'center'
  },
  decisionButtonText: {
    // color: 'white',
    fontSize: 13,
    color: 'rgb(100,152,237)',
    letterSpacing: 2,
    fontWeight: 'bold'
  }
})

export default PostCommentScreen
