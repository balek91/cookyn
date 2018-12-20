import { combineReducers } from 'redux'

import user from './user'
import recette from './recette'
import etape from './etape'


export default combineReducers({
    user, recette, etape
  })