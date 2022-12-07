import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
//import React, {useState, useEffect} from 'react'
import '../App.css';
import { LoginSession}  from '../components/login'
//import Network from '../components/network';

function Login() {
  return (
  <div>
    <Header/>
{/*     <Network />
 */}    <LoginSession />
    <Footer/>
  </div>
  );
}

export default Login;