import { GET_ALL, REFRESH } from '../actions/recetteRecette'


const initialState = {
  list : [],
  offset : 0,
  limite : 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        list : [...state.list, ...action.recette.list],
        offset : action.recette.offset,
        limite : action.recette.limite
      }
      case REFRESH:
      return {
        ...state,
        list : [...action.recette.list],
        offset : action.recette.offset,
        limite : action.recette.limite
      }
    default:
      return state
  }
}
