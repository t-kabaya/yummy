import React from 'react'
import { FlatList } from 'react-native'

import Footer from './Footer'
import Item from './Item'

export default class List extends React.Component {
  renderItem = ({ item }) => <Item {...item} />
  // keyExtractor = item => item.key

  render () {
    const { onPressFooter, data } = this.props

    // workaround, Flatlist data must not have key property
    const newData = data.map(x => ({ ...x, contentId: x.key }))
    console.log({ listProps: this.props })
    return (
      <FlatList
        // keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderItem={this.renderItem}
        // {...props}
        data={newData}
      />
    )
  }
}
