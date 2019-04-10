import axios from 'axios'

export const GET_ALL_USER = 'GET_ALL_USER'
export const REFRESH_USER = 'REFRESH_USER'

export const allUser = (userRecherche) => ({

  type: GET_ALL_USER,
  userRecherche
})

export const refreshUser = (userRecherche) => ({

  type: REFRESH_USER,
  userRecherche
})

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
