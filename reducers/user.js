import { CONNEXION, DECONNEXION_USER, ABONNEMENT , ABONNE, CONNECT} from '../actions/user'

const initialState = {
  user:null,
  abonnementList : [],
  abonneList : [],
  userProfil : null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case CONNEXION:
          return {
            ...state,
            user: action.id  
          }
      case DECONNEXION_USER:
          return {
            state : initialState
          }
      case ABONNEMENT: {
        return{
          ...state,
          abonnementList : [...action.user.users],
        }
      }
      case ABONNE: {
        return{
          ...state,
          abonneList : [...action.user.users],
        }
      }
      case CONNECT : {
        return{
          ...state,
          userProfil : action.u
        }
      }
      default:
        return state
    }
  }
  