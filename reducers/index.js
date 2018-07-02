import { LOAD_DECKS, ADD_UPDATE_DECK } from '../actions'

function decks (state = {}, action){
  switch(action.type){
    case LOAD_DECKS:
      return action.decks
    case ADD_UPDATE_DECK:
      const { deck } = action
      return { ...state, [deck.id]: deck }
    default:
      return state
  }
}

export default decks
