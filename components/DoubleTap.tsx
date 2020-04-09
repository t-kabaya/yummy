import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'

type propsType = {
  onDoubleTap: () => void,
  children: React.ReactNode
}

export default (props: propsType) => {
  lastTap = null

  const handleDoubleTap = () => {
    const now = Date.now()
    this.lastTap && now - this.lastTap < 300
      ? props.onDoubleTap()
      : (this.lastTap = now)
  }

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      {props.children}
    </TouchableWithoutFeedback>
  )
}
