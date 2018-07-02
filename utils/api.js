import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from './consts'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((result) => result ? JSON.parse(result) : {})
}

export function saveOrUpdateDeck (deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deck.id]: deck
  })).then(() => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then((result) => result ? JSON.parse(result) : {})
      .then((deckList) => deckList ? deckList[deck.id] : {})
  })
}

