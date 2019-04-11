import { GET_ALL_ACTUALITE, REFRESH_ACTUALITE } from '../actions/actualites'


const initialState = {
  list : [],
  offset : 0,
  limite : 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ACTUALITE:
      return {
        ...state,
        list : [...state.list, ...action.actualite.list],
        offset : action.actualite.offset,
        limite : action.actualite.limite
      }
      case REFRESH_ACTUALITE:
      return {
        ...state,
        list : [...action.actualite.list],
        offset : action.actualite.offset,
        limite : action.actualite.limite
      }
      case DECONNEXION_ACTUALITE:
          return {
            state : initialState
          }
    default:
      return state
  }
}
