import firebase from 'firebase'
import React, { Component } from 'react'
import { LayoutAnimation, RefreshControl } from 'react-native'

import List from '../components/List'
import { getPaged } from '../firebase/Fire'

const PAGE_SIZE = 5

export default class FeedScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {}
  }

  componentDidMount () {
    this.makeRemoteRequest()
  }

  // Append the item to our states `data` prop
  addPosts = posts => {
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        ...posts
      }
      return {
        data,
        // Sort the data by timestamp
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp)
      }
    })
  }

  // Call our database and ask for a subset of the user posts
  makeRemoteRequest = async lastKey => {
    // If we are currently getting posts, then bail out..
    if (this.state.loading) return
    this.setState({ loading: true })

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const { data, cursor } = await getPaged({
      size: PAGE_SIZE,
      start: lastKey
    })

    this.lastKnownKey = cursor
    // Iteratively add posts
    let posts = {}
    for (let child of data) {
      posts[child.key] = child
    }
    this.addPosts(posts)

    // Finish loading, this will stop the refreshing animation.
    this.setState({ loading: false })
  }

  // Because we want to get the most recent items, don't pass the cursor back.
  // This will make the data base pull the most recent items.
  _onRefresh = () => this.makeRemoteRequest()

  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey)

  render () {
    LayoutAnimation.easeInEaseOut()
    return (
      <List
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this._onRefresh}
          />
        }
        onPressFooter={this.onPressFooter}
        data={this.state.posts}
      />
    )
  }
}
