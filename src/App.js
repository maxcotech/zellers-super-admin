import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthGuard from './config/guards/AuthGuard';
import { fetchUser } from './redux/actions/AuthActions';
import 'react-toastify/dist/ReactToastify.css';
import './scss/style.scss';
import axios from 'axios';
import ForgotPassword from './pages/authentication/forgot-password';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./pages/login/Login'));
const Register = React.lazy(() => import('./pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const InvalidAccount = React.lazy(() => import('./pages/invalid_account/InvalidAccount'));


const App = (props) => {
  const auth = useSelector(state => state.auth);
  const store = useSelector(state => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('App initialized. Fetching user...');
    axios.defaults.withCredentials = true;
    if (dispatch && auth.init === false) {
      dispatch(fetchUser());
    }
  }, [auth.logged_in])

  return (
    <HashRouter>
      <ToastContainer />
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/invalid/account" name="Invalid User" render={props => <InvalidAccount {...props} />} />
          <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
          <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
          <Route exact path="/forgot-password" name="Forgot password" render={props => <ForgotPassword {...props} />} />
          <AuthGuard loggedIn={auth.logged_in} path="/" name="Home" redirectTo="/login" userStore={store.current_store} userRole={auth.user?.user_type} component={TheLayout} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );

}

export default App;
