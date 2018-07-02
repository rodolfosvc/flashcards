import React, { Component } from 'react'
import { View, Text, TextInput,
  TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { SCREENS_NAMES } from '../../utils/consts'
import { purple, white } from '../../utils/colors'
import { createDeck } from '../../actions'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  addDeckBtn: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: purple,
    width: 180
  },
  textQuestion: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 180
  },
  textBtn: {
    color: white
  },
  titleInput: {
    padding: 5,
    width: 180
  }
})

class AddDeck extends Component {

  state = {
    title: ''
  }

  saveDeck = () => {
    const { navigation } = this.props
    const { title } = this.state
    debugger
    this.props.dispatch(createDeck(title))
      .then(() => navigation.navigate(SCREENS_NAMES.DECK_LIST))
  }

  changeText = (title) => {
    this.setState({title})
  }

  render(){
    const { title } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.textQuestion}>What is the title of your new deck?</Text>
        <TextInput
            style={styles.titleInput}
            placeholder="Title"
            onChangeText={title => this.changeText(title)}
            value={title} />
        <TouchableOpacity
          style={styles.addDeckBtn}
          onPress={this.saveDeck}
        >
          <Text style={styles.textBtn}> Add new deck </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    )
  }
}

export default connect()(AddDeck)