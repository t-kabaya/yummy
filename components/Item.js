import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { increaseNiceCount } from '../firebase/Fire'

const profileImageSize = 36
const padding = 12

export default class Item extends React.Component {
  state = {}

  componentDidMount () {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({ width, height })
      })
    }
  }

  render () {
    const {
      contentId,
      text,
      name,
      imageWidth,
      imageHeight,
      uid,
      image,
      niceCount
    } = this.props
    console.log({ props: this.props })

    // Reduce the name to something
    const imgW = imageWidth || this.state.width
    const imgH = imageHeight || this.state.height
    const aspect = imgW / imgH || 1

    return (
      <View>
        <Header image={{ uri: image }} name={name} />
        <Image
          resizeMode='contain'
          style={{
            backgroundColor: '#D8D8D8',
            width: '100%',
            aspectRatio: aspect
          }}
          source={{ uri: image }}
        />
        <Metadata
          contentId={contentId}
          niceCount={niceCount}
          name={name}
          description={text}
        />
      </View>
    )
  }
}

const Metadata = ({ name, description, contentId, niceCount }) => {
  return (
    <View style={styles.padding}>
      <IconBar contentId={contentId} niceCount={niceCount} />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.subtitle}>{description}</Text>
    </View>
  )
}

const Header = ({ name, image }) => (
  <View style={[styles.row, styles.padding]}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={image} />
      <Text style={styles.text}>{name}</Text>
    </View>
    <Icon name='ios-more' />
  </View>
)

const Icon = ({ name }) => (
  <Ionicons style={{ marginRight: 8 }} name={name} size={26} color='black' />
)

const IconBar = ({ contentId, niceCount }) => (
  <View style={styles.row}>
    <View style={styles.row}>
      <TouchableHighlight
        onPress={() => increaseNiceCount(contentId, niceCount)}
      >
        <Icon name='ios-heart-empty' />
      </TouchableHighlight>
      <Text>{niceCount}</Text>
      <Icon name='ios-chatbubbles' />
      <Icon name='ios-send' />
    </View>
    <Icon name='ios-bookmark' />
  </View>
)

const styles = StyleSheet.create({
  text: { fontWeight: '600' },
  subtitle: {
    opacity: 0.8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  padding: {
    padding
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: '#D8D8D8',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: 'cover',
    marginRight: padding
  }
})
