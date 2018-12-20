import { ADD, UPDATE } from '../actions/etape'


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
      default:
        return state
    }
  }