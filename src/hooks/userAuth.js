import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";

let p = new Promise((resolve, reject) => {
    axios.get('http://localhost:5000/tokenvalidation', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }})
      .then(response =>{
        //p = response['data']['token']
        resolve(response['data']['token'])
        console.log('token!!! from Protected Routes: ', response['data']['token']);
      })
  })

export default function userAuth() {
  return p === true /* && Cookies.get('userSession') */ ? <Outlet/> : <Navigate to="/" replace />;
}
