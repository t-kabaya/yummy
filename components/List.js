import React from 'react'
import { FlatList } from 'react-native'

import Footer from './Footer'
import Item from './Item'

const List = props => {
  const { onPressFooter, data } = props
  // workaround, Flatlist data must not have key property
  const newData = data.map(x => ({ ...x, contentId: x.key }))
  // console.log({ listProps: this.props })
  return (
    <FlatList
      keyExtractor={(item, index) => item.contentId}
      ListFooterComponent={footerProps => (
        <Footer {...footerProps} onPress={onPressFooter} />
      )}
      renderItem={({ item }) => (
        <Item {...item} navigation={props.navigation} />
      )}
      data={newData}
    />
  )
}

export default List
