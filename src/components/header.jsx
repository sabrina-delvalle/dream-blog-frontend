import { useState, useEffect } from "react";
//import { UserContext } from '../UserContext';
import React from "react";
import NavBar from "./navbar"
import axios from 'axios';
import Cookies from 'js-cookie'
//import { navigate } from "react-router-dom"
//axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


export default function Header() {
  const [user, setUser] = useState(false);
  const [name, setName] = useState('Login');
  const [userImg, setUserImg] = useState('');
  const [bearer, setBearer] = useState(undefined)
  //const { logUser, setLogUser } = useContext(UserContext);
  
  useEffect( () => {
    async function retrieveToken(){
      try{
          await axios.get(`${process.env.REACT_APP_API}/token`, {
          headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          }
        })
        .then(response => {
          console.log(response.data);
          console.log('previous token, ', response);
          if(response.data['token']) {
            setBearer(`Bearer ${response.data['token']}`)
          }
        })
      }catch(err){
        console.log(err)
      }
    }
    retrieveToken()

    console.log('bearer, before get: ', bearer)
    
    if(bearer){
      console.log('its passing away');
      fetch(`${process.env.REACT_APP_API}/user`, {
       method: 'GET',
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         "Authorization": bearer
       }
     })
     .then(response => response.json())
     .then(data => {
       //data.password = "";
       console.log('data retrieve: ', data);
       if(!data.name){
         return setUser(false)
       }
       setName(data.name.toUpperCase()[0] + data.name.slice(1))
       setUserImg(data.image)
       //console.log(name)
       setUser(true);
       //setLogUser(true);
     })
    }
    //if(user) setLogUser(true)
    //console.log('before the fucking user to looooog, user: ', user, " and the logUser, ", logUser);

  }, [user, name, bearer])

  const handleCookieDelete = () => {
    console.log('here handling cookie inside')
    axios.get(`${process.env.REACT_APP_API}/clearcookie`, {withCredentials: true})
    .then((res) => {
      console.log(res.data)
      //setLogUser(false)
      //document.location.reload() 
      Cookies.remove('userSession')
      document.location.replace('/')
  })}


  const toRender = user ? <Logged userImg={userImg} name={name} setBearer={setBearer} clearCookie={handleCookieDelete}/> : <Login /> 
  return (
    
  <div>
    <div className="Header">
        <div className="log">
          {toRender}       
        </div>
    </div>
    <NavBar/>
  </div>
  )
}


function Login(props){
  return (
    <div>
      <a href={`${process.env.REACT_APP_ORIGIN_PAGE}/login`} className="log-link">Login</a>/<a href={`${process.env.REACT_APP_ORIGIN_PAGE}/register`} className="log-link">Sign In</a>
    </div>
  )
}

function Logged(props){
  return (
  <div className="logs">
    
    <a href={`${process.env.REACT_APP_ORIGIN_PAGE}/profile`} className="log-link">Welcome, {props.name}</a> 
    

    <img src={props.userImg} width='50px' className="profile-img" alt='profile-img'/>
    <button className="logout-link" onClick={props.clearCookie}>log Out</button>
  </div>
  )
}