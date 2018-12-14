export const GO = 'GO'
export const BACK = 'BACK'

export const go = (etapes) => ({

    type: GO,
    etapes
  })
  
  export const back = (etapes) => ({
  
    type: BACK,
    etapes
  })