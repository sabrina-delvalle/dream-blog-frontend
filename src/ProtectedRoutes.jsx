import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from "axios";
//import { useState } from "react";
//import { useEffect } from "react";
//import { useEffect } from "react";


export default function ProtectedRoutes() {

 // const [token, setToken] = useState(null);

  let token = new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_API}/tokenvalidation`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }})
          .then(response =>{
            resolve(response['data']['token'])
            console.log('token!!! from Protected Routes: ', response['data']['token']);
          })
      });

  //find a way to FIX retriving TOKEN FROM API, for the moment just do the deploy
    
    console.log('the token value:::: ', token );
  return (
    token && Cookies.get('userSession') ? <Outlet/> : <Navigate to="/" replace />
  )


}