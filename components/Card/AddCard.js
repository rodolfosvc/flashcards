import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import { SCREENS_NAMES } from '../../utils/consts'
import { purple, white } from '../../utils/colors'
import { isStrEmpty } from '../../utils/helpers'
import { createCard } from '../../actions'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  addCardBtn: {
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
  textInput: {
    padding: 5,
    width: 180
  }
})

class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  }

  saveCard = () => {
    const { navigation } = this.props
    const { deck } = navigation.state.params
    const newQuestion = this.state
    if(!newQuestion || isStrEmpty(newQuestion.question) || isStrEmpty(newQuestion.answer)){
      Alert.alert(
        'Required fields',
        'All fields are required',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      )
    }else{
      this.props.dispatch(createCard(deck, newQuestion))
      .then(() => navigation.goBack())
    }
  }

  render() {

    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
            style={styles.textInput}
            placeholder="Question"
            onChangeText={q => this.setState({question: q})}
            value={question} />
        <TextInput
            style={styles.textInput}
            placeholder="Answer"
            onChangeText={a => this.setState({answer: a})}
            value={answer} />
        <TouchableOpacity
          style={styles.addCardBtn}
          onPress={this.saveCard}
        >
          <Text style={styles.textBtn}> Add card </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }


}

export default connect()(AddCard)