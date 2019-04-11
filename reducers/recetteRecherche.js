import { GET_ALL_RECETTE, REFRESH_RECETTE } from '../actions/recetteRecherche'


const initialState = {
  list : [],
  offset : 0,
  limite : 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECETTE:
      return {
        ...state,
        list : [...state.list, ...action.recetteRecherche.list],
        offset : action.recetteRecherche.offset,
        limite : action.recetteRecherche.limite
      }
      case REFRESH_RECETTE:
      return {
        ...state,
        list : [...action.recetteRecherche.list],
        offset : action.recetteRecherche.offset,
        limite : action.recetteRecherche.limite
      }
      case DECONNEXION_RECHERCHE_RECETTE:
          return {
            state : initialState
          }
    default:
      return state
  }
}
