import axios from 'axios'

export const GET_ALL = 'GET_ALL'
export const REFRESH = 'REFRESH'
export const DECONNEXION_RECETTE ='DECONNEXION_RECETTE'

export const allRecette = (recette) => ({

  type: GET_ALL,
  recette
})

export const refreshRecette = (recette) => ({

  type: REFRESH,
  recette
})

export const clearRecetteRedux = (recette) => ({

  type: DECONNEXION_RECETTE,
  recette
})

export const getRecettes = (offset = 0, refresh = false) => dispatch => {
  console.log("koooooo")
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
}