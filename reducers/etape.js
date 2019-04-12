import { ADD, UPDATE , DECONNEXION_ETAPE} from '../actions/etape'


const initialState = {
  data: []
}


export default (state = initialState, action) => {
  console.log("yftgbtb",action)
    switch (action.type) {
      case ADD:
        return {
          ...state,
       
          data : [...state.data, action.etape],
        }
        case UPDATE:
        return {
          ...state,
            data : action.etape
        }
        case DECONNEXION_ETAPE:
          return {
            state : initialState
          }
      default:
        return state
    }
  }