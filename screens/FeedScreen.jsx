import React, { Component, useState, useEffect, useContext } from 'react'
import { Text, LayoutAnimation, RefreshControl, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import { loadMore } from '../assets/constant/text'
import { getPosts } from '../firebase/PostFireStore'
import Footer from '../components/Footer'
import Item from '../components/Item'
import { Context } from '../state/Store.tsx'

const PAGE_SIZE = 10

export default (props) => {
  const {state, dispatch} = useContext(Context)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  },[])

  const fetchPosts = async (): Promise<void> => {
    const { posts } = await getPosts()
    dispatch({type: 'SET_FEEDS', payload: posts})
    setLoading(false)
  }

  return (
    <FlatList
      keyExtractor={item => item.contentId}
      ListFooterComponent={item => (
          <TouchableHighlight
            underlayColor={'#eeeeee'}
            onPress={fetchPosts}
            style={S.touchable}
          >
            <Text style={S.text}>{loadMore}</Text>
          </TouchableHighlight>
      )}
      renderItem={({ item }) => (
        <Item item={item} navigation={props.navigation} />
      )}
      data={state.feeds}
      onRefresh={fetchPosts}
      refreshing={loading}
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
