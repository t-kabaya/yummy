import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import Text from '../components/Text'
import { loadMore } from '../assets/constant/text'

export default props => (
  <TouchableHighlight
    underlayColor={'#eeeeee'}
    {...props}
    onPress={() => props.onPress()}
    style={[S.touchable, props.style]}
  >
    <Text style={S.text}>{loadMore}</Text>
  </TouchableHighlight>
)

const S = StyleSheet.create({
  touchable: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16
  }
})
