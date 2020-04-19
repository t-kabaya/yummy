import firebase from 'firebase'
import React, { Component } from 'react'
import { Text, LayoutAnimation, RefreshControl, FlatList, StyleSheet, TouchableHighlight} from 'react-native'
import { loadMore } from '../assets/constant/text'

import { getPaged } from '../firebase/PostFireStore'
import Footer from '../components/Footer'
import Item from '../components/Item'

const PAGE_SIZE = 5

export default class FeedScreen extends Component {
  state = {
    loading: false,
    posts: []
  }

  componentDidMount () {
    this.fetchPosts()
  }

  fetchPosts = async (lastKey): Promise<void> => {
    if (this.state.loading) return

    this.setState({ loading: true })

    const { posts, cursor } = await getPaged({
      size: PAGE_SIZE,
      start: lastKey
    })

    this.lastKnownKey = cursor

    this.setState({posts, loading: false})
  }

  render () {
    const newData = this.state.posts.map(x => ({ ...x, contentId: x.key }))

    return (
      <FlatList
        keyExtractor={item => item.contentId}
        ListFooterComponent={item => (
            <TouchableHighlight
              underlayColor={'#eeeeee'}
              onPress={() => this.fetchPosts()}
              style={S.touchable}
            >
              <Text style={S.text}>{loadMore}</Text>
            </TouchableHighlight>
        )}
        renderItem={({ item }) => (
          <Item item={item} navigation={this.props.navigation} />
        )}
        data={newData}
      />
    )
  }
}

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
