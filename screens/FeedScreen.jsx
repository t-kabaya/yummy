import firebase from 'firebase'
import React, { Component } from 'react'
import { LayoutAnimation, RefreshControl } from 'react-native'

import List from '../components/List'
import { getPaged } from '../firebase/Fire'

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
    return (
      <List
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.fetchPosts}
          />
        }
        onPressFooter={() => this.fetchPosts(this.lastKnownKey)}
        data={this.state.posts}
        navigation={this.props.navigation}
      />
    )
  }
}
