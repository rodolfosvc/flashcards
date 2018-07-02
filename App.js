import React from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from './utils/colors'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStackNavigator } from 'react-navigation'
import DeckList from './components/Deck/DeckList'
import thunk from 'redux-thunk'
import AddDeck from './components/Deck/AddDeck'
import AddDeckBtn from './components/Deck/AddDeckBtn'
import AppStatusBar from './components/StatusBar/AppStatusBar'
import DeckDetail from './components/Deck/DeckDetail'
import AddCard from './components/Card/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

const MainNavigator = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: ({navigation}) => ({
      title: 'Decks',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      headerRight: <AddDeckBtn navigation={navigation}/>,
    })
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: ({navigation}) => ({
      title: 'Add Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    })
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({navigation}) => ({
      title: 'Deck Detail',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({navigation}) => ({
      title: 'Add card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    })
  }
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
