import * as ServerAPI from '../utils/api'
import uuidv4 from 'uuid/v4'

export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_UPDATE_DECK = 'ADD_DECK'

export const loadDecks = (decks) => ({
  type: LOAD_DECKS,
  decks
})

export const addUpdateDeck = (deck) => ({
  type: ADD_UPDATE_DECK,
  deck
})

export const fetchDecks = () => dispatch => (
  ServerAPI
    .getDecks()
    .then( decks => {
      dispatch(loadDecks(decks))
    })
)

export const createDeck = (title) => dispatch => {
  const newDeck = {
    title,
    id: uuidv4(), //cirando id para o deck
    questions: []
  }
  return ServerAPI
    .saveOrUpdateDeck(newDeck)
    .then(deck => {
      dispatch(addUpdateDeck(deck))
    })
}

export const createCard = (deck, newCard) => dispatch => {
  if(deck){
    const deckToUpdate = deck
    if(!deckToUpdate.questions)
      deckToUpdate.questions = []
    deckToUpdate.questions.push(newCard)
    return ServerAPI
      .saveOrUpdateDeck(deckToUpdate)
      .then(deck => {
        dispatch(addUpdateDeck(deck))
      })
  }
}

