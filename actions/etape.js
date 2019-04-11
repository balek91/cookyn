export const ADD = 'ADD'
export const UPDATE = 'UPDATE'
export const DECONNEXION_ETAPE ='DECONNEXION_ETAPE'

export const Add = (etape) => ({

    type: ADD,
    etape
  })
  
  export const Update = (etape) => ({
  
    type: UPDATE,
    etape
  })

  export const clearEtapeRedux = (etape) => ({
    type:DECONNEXION_ETAPE,

  })