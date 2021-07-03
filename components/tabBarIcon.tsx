import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'

export default (name: string) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    size={24}
  />
)
