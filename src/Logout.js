import React from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';

function Logout() {
  const cookies = new Cookies();
  const [loggedOut, setLoggedOut] = React.useState(true);

  if (loggedOut) {
    cookies.set('authCookie', 'false', { path: '/' });
    return (
      <Redirect push to={{
        pathname:"/"
      }}/>
    )
  }

  return (
    <div>
    Logged out.
    </div>
  )
}

export default Logout;