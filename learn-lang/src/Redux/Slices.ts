import {createSlice,PayloadAction} from "@reduxjs/toolkit"


const initialState:StateType={
    loading:false,
    result:[],
    words:[]
  
}



const rootSlice = createSlice({
    name:"root",
    initialState,
    reducers:{
        getWordsrequest:(state)=>{
            state.loading=true
        },
        getWordsSuccess:(state,action:PayloadAction<Wordtype[]>)=>{
            state.loading=false
            state.words=action.payload
            sessionStorage.setItem('words',JSON.stringify(action.payload))
            
        },
        getWordsfail:(state,action:PayloadAction<string>)=>{
            state.loading=false
            state.error=action.payload
        },
        saveResult:(state,action:PayloadAction<string[]>)=>{
            state.loading=false,
            state.result=action.payload
        },
        clearState:(state)=>{
            state.loading=false,
            state.result=[],
            state.words=[],
            state.error=undefined,
            sessionStorage.removeItem("words"),
            sessionStorage.removeItem("language")
            
        }
        
    }
})

export const {getWordsSuccess,getWordsfail,getWordsrequest,saveResult,clearState} =rootSlice.actions

export default rootSlice.reducer
