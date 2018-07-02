import React, { Component } from 'react'
import { View, Text, TextInput,
  TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { SCREENS_NAMES } from '../../utils/consts'
import { purple, white } from '../../utils/colors'
import { createDeck } from '../../actions'
import { connect } from 'react-redux'
import { isStrEmpty } from '../../utils/helpers'
import uuidv4 from 'uuid/v4'

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
    if(isStrEmpty(title)){
      Alert.alert(
        'Required fields',
        'All fields are required',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      )
    }else{
      const id = uuidv4() //criando id do deck
      this.props.dispatch(createDeck(title, id))
      .then(() => { navigation.navigate(SCREENS_NAMES.DECK_DETAIL, { deckId: id })})
    }
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