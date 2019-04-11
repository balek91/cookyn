import axios from 'axios'

export const CONNEXION = 'CONNEXION'
export const DECONNEXION_USER = 'DECONNEXION_USER'
export const ABONNEMENT = 'ABONNEMENT'
export const ABONNE = 'ABONNE'
export const CONNECT = 'CONNECT'


export const connexion = (id) => ({

    type: CONNEXION,
    id
  })
  
  export const deconnexion =() => ({
    type: DECONNEXION_USER
  })

  export const allAbonnement = (user) => ({
    type: ABONNEMENT,
    user
  })

  export const allAbonne = (user) => ({
    type: ABONNE,
    user
  })

  export const userConnect = (u) => ({
    type : CONNECT,
    u
  })

  export const getAbonnesByUser = (idUser) => dispatch => {
    axios.get(`http://51.75.22.154:8080/Cookyn/relation/GetListAbonne/${idUser}`)
      .then(res => {

          dispatch(
            allAbonne({
              users: res.data
            })
          )
        }   
      )
  }

  export const getAbonnementsByUser = (idUser) => dispatch => {
    axios.get(`http://51.75.22.154:8080/Cookyn/relation/GetListAbonnement/${idUser}`)
      .then(res => {

          dispatch(
            allAbonnement
            ({
              users: res.data
            })
          )
        }   
      )
  }

  export const getUserConnect = (idUser) => dispatch => {
    axios.get(`http://51.75.22.154:8080/Cookyn/user/GetUserById/${idUser}`)
      .then(res => {
          dispatch(
            userConnect
            ({
              user: res.data
            })
          )
        }   
      )
  }