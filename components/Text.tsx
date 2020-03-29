// CustomText.js    
import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default props => <Text style={[S.text, props.style]}>{props.children}</Text>

const S = StyleSheet.create({ text: { fontFamily: 'notosans' } })
