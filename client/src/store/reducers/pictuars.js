import produce from "immer"
import createReducer from './utilReducer'
const initialState={
    url:""
 
}
const pictuarsReducer={
    uploadImg(state,action){

    },
    getImg(state,action){
        
    }
}
export default produce((state,action)=>createReducer(state,action,pictuarsReducer),initialState)
