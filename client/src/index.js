import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store';
import firebase from 'firebase/app'
import 'firebase/auth';
import {
  isLoaded, 
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase';
import firebaseConfig from './firebase/firebaseIndex'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';


// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}
function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
      return children
}


ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
        </Provider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
