import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'
import Text from '../components/Text.tsx'
import {
  getUserName,
  saveUserName,
  clearAsyncStorage
} from '../asyncStorage/userStorage'

const { height, width } = Dimensions.get('window')

const RegisterScreen = ({ goToHome }) => {
  const [_name, setName] = useState('')

  const onPressDicision = () => {
    saveUserName(_name)
    goToHome()
  }

  return (
    <KeyboardAvoidingView style={S.container}>
      <Text style={S.mediumBlackText}>あなたの名前は？</Text>
      <TextInput
        style={S.textInput}
        onChangeText={name => setName(name)}
        value={_name}
      />

      <TouchableWithoutFeedback onPress={onPressDicision}>
        <View style={S.decisionButtonContainer}>
          <Text style={S.decisionButtonText}>決定</Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  mediumBlackText: {
    padding: 24,
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center',
    textAlignVertical: 'top'
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: width * 0.8,
    backgroundColor: '#e8e8e8',
    borderRadius: 10
  },
  decisionButtonContainer: {
    height: 60,
    width: width * 0.8,
    backgroundColor: 'rgb(100,152,237)',
    borderRadius: 10,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  decisionButtonText: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 6
  }
})

export default RegisterScreen
