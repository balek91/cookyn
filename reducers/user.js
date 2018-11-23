import { CONNEXION, DECONNEXION } from '../actions/user'

const initialState = {
  user:null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case CONNEXION:
          return {
            ...state,
            user: action.id  
          }
      case DECONNEXION:
          return {
            ...state,
            user: null
          }
      default:
        return state
    }
  }
  