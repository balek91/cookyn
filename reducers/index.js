import { combineReducers } from 'redux'

import user from './user'
import recette from './recette'
import etape from './etape'
import recetteRecherche from './recetteRecherche'
import actualite from './actualites'
import userRecherche from './userRecherche'

export default combineReducers({
    user, recette, etape, recetteRecherche, userRecherche, actualite
  })