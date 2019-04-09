import axios from 'axios'

export const GET_ALL = 'GET_ALL'
export const REFRESH = 'REFRESH'

export const allUser = (user) => ({

  type: GET_ALL,
  user
})

export const refreshUser = (user) => ({

  type: REFRESH,
  user
})

export const getUsers = (libelle ='',offset = 0, refresh = false) => dispatch => {

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
