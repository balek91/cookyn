import { GO, BACK } from '../actions/etape'


const initialState = {
  data: []
}


export default (state = initialState, action) => {
    switch (action.type) {
      case GO:
        return {
          ...state,
       
          data : action.etape.limite
        }
        case BACK:
        return {
            data : action.etape.limite
        }
      default:
        return state
    }
  }