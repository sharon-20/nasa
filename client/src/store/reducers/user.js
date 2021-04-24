import produce from "immer"
import createReducer from './utilReducer'
const initialState={
    userName:"",
    email:"",
    idAdmin:"",
    password:""
}
const userReducer={
    login(state,action){

    },
    signup(state,action){
        // debugger
        console.log("fghggh")

    }
}
export default produce((state,action)=>createReducer(state,action,userReducer),initialState)
