import React, { useState } from 'react';
import { Redirect } from "react-router";
import Cookies from 'universal-cookie';

function Login() {
  const cookies = new Cookies();
  const [receivedData, setReceivedData] = useState([]);

  /**
   * Check in backend if user's name and password matches.
   * @param {*} event 
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = {name: data.get('name'), password: data.get('password')};
    const hr = await fetch(`https://practicework-backend.herokuapp.com/user/${values.name}&${values.password}`);
    const json = await hr.json();
    setReceivedData(json);
  }

  /**
   * If correct name and password was given, redirect to Search.
   */
  if (receivedData.length > 0) {
    cookies.set('authCookie', 'true', { path: '/' });
    return (
      <Redirect push to={{
        pathname:"/search"
      }}/>
      )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text"
                id="name"
                name="name"/>
          Password:
          <input type="text"
                id="password"
                name="password"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login;