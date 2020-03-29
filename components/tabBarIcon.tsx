import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'

export default (name: string) => ({ tintColor }) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
)
