import axios from 'axios'

export const GET_ALL_ACTUALITE = 'GET_ALL_ACTUALITE'
export const REFRESH_ACTUALITE = 'REFRESH_ACTUALITE'
export const DECONNEXION_ACTUALITE ='DECONNEXION_ACTUALITE'

export const allActualite = (actualite) => ({

  type: GET_ALL_ACTUALITE,
  actualite
})

export const refreshActualite = (actualite) => ({

  type: REFRESH_ACTUALITE,
  actualite
})

export const clearAcutaliteRedux = (actualite) =>({
  type:DECONNEXION_ACTUALITE,
  actualite
})

export const logout_actu = () => dispatch =>{
  dispatch(
    clearAcutaliteRedux({
      list : [],
      offset:0,
      limite:0
    })
  )
}

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