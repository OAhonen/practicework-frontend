import './App.css';
import { Route, Switch } from 'react-router';
import AdvancedSearch from './AdvancedSearch';
import Search from './Search';
import AllProducts from './AllProducts';
import Login from './Login';
import React from 'react';
import Cookies from 'universal-cookie';
import Logout from './Logout';

function App() {
  const cookies = new Cookies();
  if (cookies.get('authCookie') === undefined) {
    cookies.set('authCookie', false, { path: '/' })
  }

  return (
    <Switch>
      <Route path="/search" component={Search} exact/>
      <Route path="/advanced" component={AdvancedSearch} exact/>
      <Route path="/allproducts" component={AllProducts} exact/>
      <Route path="/" component={Login} exact/>
      <Route path="/logout" component={Logout} exact/>
    </Switch>
  );
}

export default App;
