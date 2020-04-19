import React, { Component, useState, useEffect } from 'react'
import { Text, LayoutAnimation, RefreshControl, FlatList, StyleSheet, TouchableHighlight} from 'react-native'
import { loadMore } from '../assets/constant/text'
import { getPosts } from '../firebase/PostFireStore'
import Footer from '../components/Footer'
import Item from '../components/Item'

const PAGE_SIZE = 5

const FeedScreen = (props) => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  },[])

  const fetchPosts = async (): Promise<void> => {
    const { posts } = await getPosts()

    setPosts(posts)
    setLoading(false)
  }

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
        <Item item={item} navigation={props.navigation} />
      )}
      data={posts}
    />
  )
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

export default FeedScreen
