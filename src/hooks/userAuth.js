//import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

/* let p = new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_API}/tokenvalidation`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }})
      .then(response =>{
        //p = response['data']['token']
        resolve(response['data']['token'])
        console.log('token!!! from Protected Routes: ', response['data']['token']);
      })
  }) */

export default function userAuth() {
  return Cookies.get("userSession") ? <Outlet /> : <Navigate to="/" replace />;
}
