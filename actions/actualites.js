import axios from 'axios'

export const GET_ALL_ACTUALITE = 'GET_ALL_ACTUALITE'
export const REFRESH_ACTUALITE = 'REFRESH_ACTUALITE'

export const allActualite = (actualite) => ({

  type: GET_ALL_ACTUALITE,
  actualite


})

export const refreshActualite = (actualite) => ({

  type: REFRESH_ACTUALITE,
  actualite
})

export const getActualite = (idUser,offset = 0, refresh = false) => dispatch => {
  console.log("koooooo")
  axios.get(`http://51.75.22.154:8080/Cookyn/actualite/GetActualiteByUser/${idUser}/${offset}`)
    .then(res => {
      if (!refresh) {
        dispatch(
          allActualite({
            list: res.data.listActu,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
      else {
        dispatch(
            refreshActualite({
            list: res.data.listActu,
            offset: res.data.offset,
            limite: res.data.limite,
          })
        )
      }
    }
    )
}