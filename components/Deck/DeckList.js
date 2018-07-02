import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../../actions'
import Deck from './Deck'
import _ from 'lodash'
import { AppLoading } from 'expo'

const styles = StyleSheet.create({
  deckListView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50
  },
  noDecksMessage: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center'
  }
})

class DeckList extends Component {

  state = {
    ready: false
  }

  componentDidMount(){
    this.props.loadDecks()
      .then(() => this.setState({ ready: true }))
  }

  renderItem = ({ item }) => {
      const { navigation } = this.props
      return <Deck deck={item} navigation={navigation}/>
  }

  keyExtractor = (item, index) => item ? item.id : index

  decksToArray = (decks) => {
    return Object.keys(decks).reduce((acc, currentElem) => {
      return acc.concat(decks[currentElem])
    }, [])
  }

  render(){

    const { decks } = this.props
    const { ready } = this.state

    if (!ready)
      return (<AppLoading />)

    return (
      <View style={styles.deckListView}>
        {decks && !_.isEmpty(decks) &&
          <FlatList
          data={this.decksToArray(decks)}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          />}
        {(!decks || _.isEmpty(decks)) && <Text style={styles.noDecksMessage} > You don't have decks saved! </Text>}
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadDecks: () => dispatch(fetchDecks())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList)