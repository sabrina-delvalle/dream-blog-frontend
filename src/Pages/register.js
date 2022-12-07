import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { RegisterWithLogin } from '../components/formRegister';
//import React, {useState, useEffect} from 'react'
import '../App.css';

function Register() {
  return(
    <div>
      <Header/>
      <RegisterWithLogin/>
      <Footer/>      
    </div>
  )
}

export default Register;