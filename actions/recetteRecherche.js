import axios from 'axios'

export const GET_ALL_RECETTE = 'GET_ALL_RECETTE'
export const REFRESH_RECETTE = 'REFRESH_RECETTE'
export const DECONNEXION_RECHERCHE_RECETTE='DECONNEXION_RECHERCHE_RECETTE'

export const allRecette = (recetteRecherche) => ({

  type: GET_ALL_RECETTE,
  recetteRecherche
})

export const refreshRecette = (recetteRecherche) => ({

  type: REFRESH_RECETTE,
  recetteRecherche
})

export const refreshRecette = (recetteRecherche) => ({

  type: DECONNEXION_RECHERCHE_RECETTE,
  recetteRecherche
})
export const getRecettes = (libelle ='',offset = 0, refresh = false) => dispatch => {

  if(libelle==''){
    axios.get(`http://51.75.22.154:8080/Cookyn/recette/GetListRecetteByOffSet/${offset}`)
    .then(res => {
      if (!refresh) {
        dispatch(
          allRecette({
            list: res.data.listRecette,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
      else {
        dispatch(
          refreshRecette({
            list: res.data.listRecette,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
    }
    )
  } else {
  axios.get(`http://51.75.22.154:8080/Cookyn/recette/GetListRecetteByFiltre/${libelle}/${offset}`)
    .then(res => {
      if (!refresh) {
        dispatch(
          allRecette({
            list: res.data.listRecette,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
      else {
        dispatch(
          refreshRecette({
            list: res.data.listRecette,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
    }
    )}
}
