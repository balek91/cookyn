import { combineReducers } from 'redux'

import user from './user'
import recette from './recette'
import etape from './etape'
import recetteRecherche from './recetteRecherche'


export default combineReducers({
    user, recette, etape, recetteRecherche
  })