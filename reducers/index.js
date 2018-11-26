import { combineReducers } from 'redux'

import user from './user'
import recette from './recette'


export default combineReducers({
    user, recette
  })