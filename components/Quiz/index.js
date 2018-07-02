import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, TouchableOpacity, View, Alert } from 'react-native'
import { SCREENS_NAMES } from '../../utils/consts'
import { purple, white } from '../../utils/colors'
import{
  clearLocalNotification,
  setLocalNotification
 } from '../../utils/helpers'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  containerQuestion: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  containerButtons: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  answerBtns: {
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
  questionAnswerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 120
  },
  questionAnswerTextBtn: {
    marginTop: 20,
    textAlign: 'center',
    color: purple
  },
  questionsCount: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10
  },
  textBtn: {
    color: white
  }
})

const firstQuestionIndex = 0

class Quiz extends Component {

  getInitialState = () => ({
    question: this.props.navigation.state.params.questions[firstQuestionIndex].question, //questão inicial
    answer: this.props.navigation.state.params.questions[firstQuestionIndex].answer, //resposta inicial
    nextQuestionIndex: firstQuestionIndex + 1, //próximo index do array de questões
    totalQuestions: this.props.navigation.state.params.questions.length,
    showAnswer: false,
    corretCount: 0,
    finished: false
  })

  state = this.getInitialState()

  goToNextQuestion = (corret) => {
    const { questions } = this.props.navigation.state.params
    const { nextQuestionIndex, corretCount, totalQuestions } = this.state
    //nextQuestionIndex = totalQuestions indica que o array de questions já foi todo consumido
    if(nextQuestionIndex === totalQuestions){
      this.setState({
        corretCount: corret ? corretCount + 1 : corretCount,
        nextQuestionIndex: nextQuestionIndex + 1, //incrementar para atualizar o número de cards restantes mostrado na tela
        finished: true })
      //limpar notificações do dia, caso existam, e criar para o dia seguinte
      clearLocalNotification()
      .then(setLocalNotification)
    }else{
      const currentQuestion = questions[nextQuestionIndex]
      this.setState(
        {...currentQuestion,
          nextQuestionIndex: nextQuestionIndex + 1,
          corretCount: corret ? corretCount + 1 : corretCount,
          showAnswer: false
        })
    }
  }

  //calcula porcentagem de acertos, arrrendodando para 2 casas decimais
  getPercentage = (number) => {
    const result = number * 100
    return result.toFixed(2)
  }

  restartQuiz = () => {
    this.setState(this.getInitialState())
  }

  render() {
    const { question, answer, totalQuestions,
      nextQuestionIndex, showAnswer, corretCount, finished } = this.state
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.containerQuestion}>
          <Text style={styles.questionsCount}> {`${totalQuestions - (nextQuestionIndex - 1)}/${totalQuestions}`} </Text>
          <Text style={styles.questionAnswerText}> { showAnswer? answer : question} </Text>
          <TouchableOpacity
          onPress={() => this.setState({showAnswer: !showAnswer})}
          >
            <Text style={styles.questionAnswerTextBtn}> { showAnswer? 'Question' : 'Answer'} </Text>
          </TouchableOpacity>
        </View>
        {showAnswer &&
          <View style={styles.containerButtons}>
            <TouchableOpacity
            style={styles.answerBtns}
            onPress={() => this.goToNextQuestion(true)}
            >
              <Text style={styles.textBtn}> Corret </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.answerBtns}
              onPress={() => this.goToNextQuestion(false)}
            >
              <Text style={styles.textBtn}> Incorret </Text>
            </TouchableOpacity>
          </View>
        }
        { finished &&
          Alert.alert(
            'Quiz finished',
            `Your score was: ${this.getPercentage(corretCount/totalQuestions)} %`,
            [
              {text: 'Restart Quiz', onPress: () => this.restartQuiz()},
              {text: 'Bak to Deck', onPress: () => navigation.goBack()}
            ],
            { cancelable: false }
          )
        }
      </View>
    )
  }
}

export default Quiz