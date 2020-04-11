import React from 'react'
import { FlatList } from 'react-native'

import Footer from './Footer'
import Item from './Item'

export default props => {
  const { onPressFooter, data } = props
  // workaround, Flatlist data must not have key property
  const newData = data.map(x => ({ ...x, contentId: x.key }))
  // console.log({ listProps: this.props })
  return (
    <FlatList
      keyExtractor={item => item.contentId}
      ListFooterComponent={item => (
        <Footer {...item} onPress={onPressFooter} />
      )}
      renderItem={({ item }) => (
        <Item {...item} navigation={props.navigation} />
      )}
      data={newData}
    />
  )
}

