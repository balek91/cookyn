import { GET_ALL_USER, REFRESH_USER } from '../actions/userRecherche'


const initialState = {
  list : [],
  offset : 0,
  limite : 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        list : [...state.list, ...action.userRecherche.list],
        offset : action.userRecherche.offset,
        limite : action.userRecherche.limite
      }
      case REFRESH_USER:
      return {
        ...state,
        list : [...action.userRecherche.list],
        offset : action.userRecherche.offset,
        limite : action.userRecherche.limite
      }
    default:
      return state
  }
}