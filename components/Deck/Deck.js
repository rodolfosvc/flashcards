import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white, gray } from '../../utils/colors'
import { SCREENS_NAMES } from '../../utils/consts'

const styles = StyleSheet.create({
  deckBtn: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: 5,
    padding: 5,
    borderColor: gray,
    marginBottom: 10
  },
  textBtn: {
    color: purple
  }
})

const Deck = ({deck, navigation}) => (
  <View>
    { deck &&
      <TouchableOpacity
      style={styles.deckBtn}
      onPress={() => navigation.navigate(SCREENS_NAMES.DECK_DETAIL, { deckId: deck.id })}
      >
        <Text style={[styles.textBtn, {marginBottom: 10}]}> {deck.title} </Text>
        { deck.questions && <Text style={styles.textBtn}> { `${deck.questions.length} cards` } </Text> }
      </TouchableOpacity>
    }
  </View>
)

export default Deck