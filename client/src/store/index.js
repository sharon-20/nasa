
import userReducer from './reducers/user'
import {
    firebaseReducer
  } from 'react-redux-firebase'
import {createStore,combineReducers} from 'redux'
const reducer=combineReducers({
    userReducer,
    firebase: firebaseReducer
})
const store =createStore(reducer,{})

export default store
 
