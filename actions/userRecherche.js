import axios from 'axios'

export const GET_ALL_USER = 'GET_ALL_USER'
export const REFRESH_USER = 'REFRESH_USER'
export const DECONNEXION_USER_RECHERCHE = 'DECONNEXION_USER_RECHERCHE'

export const allUser = (userRecherche) => ({

  type: GET_ALL_USER,
  userRecherche
})

export const refreshUser = (userRecherche) => ({

  type: REFRESH_USER,
  userRecherche
})

export const clearUserRechercheRedux = (userRecherche) => ({

  type: DECONNEXION_USER_RECHERCHE,
  userRecherche
})


export const logout_userRecherche = () => dispatch =>{
  dispatch(
    clearUserRechercheRedux({
      list : [],
      offset:0,
      limite:0
    })
  )
}

export const getUsers = (libelle ='',offset = 0, refresh = false) => dispatch => {

  if(libelle==''){
    axios.get(`http://51.75.22.154:8080/Cookyn/user/GetlistUsersByOffSet/${offset}`)
    .then(res => {
      if (!refresh) {
        dispatch(
          allUser({
            list: res.data.listUser,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
      else {
        dispatch(
          refreshUser({
            list: res.data.listUser,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
    }
    )
  } else {
  axios.get(`http://51.75.22.154:8080/Cookyn/user/GetListUserByFiltre/${libelle}/${offset}`)
    .then(res => {
      if (!refresh) {
        dispatch(
          allUser({
            list: res.data.listUser,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
      else {
        dispatch(
          refreshUser({
            list: res.data.listUser,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
    }
    )}
}
