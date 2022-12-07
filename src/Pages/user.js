//import Header from '../components/header';
//import Main from '../components/main';
//import Aside from '../components/aside';
//import Footer from '../components/footer';
//import React, {useState, useEffect} from 'react'
import '../App.css';

function User(){
    function handleAuth(){
        fetch('/user', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtbWEiLCJpYXQiOjE2Njk3NjE3NzEsImV4cCI6MTY2OTc3OTc3MX0.5bkCU-LPcqKiWFDVDe910LsNyG23syhWhUdTTfFTALo"
            }
        })
            .then(response => response.json())
            .then(data=>console.log(data))
    }
        return(<div>
            <h1>{handleAuth}</h1>
        </div>
        )
}
/* function Index() {
  return (
  <div>
    <Header/>
    <Aside/>
    <User />
    <Footer/>
  </div>
  );
} */


export default User;
