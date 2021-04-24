
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import PrivateArea from './components/PrivateArea';
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

function PrivateRoute({ children, ...rest }) {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
function App() {

  return (
    <BrowserRouter>
    <Switch>
      <PrivateRoute path="/privateArea">
          <PrivateArea></PrivateArea>
      </PrivateRoute>

      <Route path="/login">
        <LoginPage />
      </Route>

      <Route path="/register">
        <RegisterPage />
      </Route>

      <PrivateRoute path="/">
        <HomePage />
      </PrivateRoute>

    </Switch>
  </BrowserRouter>
  );
}

export default App;
