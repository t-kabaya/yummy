import React, { Component, useState, useEffect, useContext } from 'react'
import { Text, LayoutAnimation, RefreshControl, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import { loadMore } from '../assets/constant/text'
import { getPosts } from '../firebase/PostFireStore'
import Footer from '../components/Footer'
import Item from '../components/Item'
import { Context } from '../state/Store'
import { maybeInitUser } from '../postgresql/UserSql'

const PAGE_SIZE = 30

export default (props: any) => {
  const {state, dispatch} = useContext(Context)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
    maybeInitUser()
  },[])

  const fetchPosts = async (): Promise<void> => {
    const { posts } = await getPosts()
    dispatch({type: 'SET_FEEDS', payload: posts})
    setLoading(false)
  }

  return (
    <FlatList
      keyExtractor={item => item.contentId}
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
  text: {
    fontWeight: 'bold',
    fontSize: 16
  }
})
