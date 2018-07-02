import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { SCREENS_NAMES } from '../../utils/consts'
import { purple, white } from '../../utils/colors'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingTop: 50,
    paddingBottom: 50
  },
  deckTitle: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center'
  },
  cardsLength: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center'
  },
  textBtn: {
    color: white
  },
  btn: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: purple,
    width: 180,
    alignSelf: 'center'
  },
})

const DeckDetail = ({deck, navigation}) => {

  const goToQuiz = () => {
    if(deck && deck.questions && deck.questions.length > 0){
      navigation.navigate(SCREENS_NAMES.QUIZ, {questions: deck.questions})
    }else{
      Alert.alert(
        'Quiz',
        'This deck does not have cards to start a quiz!!',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      )
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.deckTitle}>{deck ? deck.title : ''}</Text>
        {deck && deck.questions &&
          <Text style={styles.cardsLength}>{`${deck.questions.length} cards`}</Text>
        }
        <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS_NAMES.ADD_CARD, {deck})}
            style={[styles.btn, {marginTop: 120}]}
        >
          <Text style={styles.textBtn}>Add card</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => goToQuiz()}
            style={styles.btn}
        >
          <Text style={styles.textBtn}>Start quiz</Text>
        </TouchableOpacity>
    </View>
  )
}

function mapStateToProps (decks, ownProps) {
  const { deckId } = ownProps.navigation.state.params
  return {
    deck: decks[deckId]
  }
}

export default connect(mapStateToProps)(DeckDetail)