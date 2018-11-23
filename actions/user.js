export const CONNEXION = 'CONNEXION'
export const DECONNEXION = 'DECONNEXION'


export const connexion = (id) => ({

    type: CONNEXION,
    id
  })
  
  export const decreasecounter =() => ({
    type: DECONNEXION
  })