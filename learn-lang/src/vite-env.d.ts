/// <reference types="vite/client" />


type LangType='ja'|'hi'|'es'|'fr'


interface Wordtype{
    word: string,
    meaning: string,
    options: string[]
}


interface StateType{

    loading: boolean,
    result:string[],
    words:Wordtype[],
    error?:string
}



interface fetchedDataType{
  translations:{
  text:string
  }[]
}