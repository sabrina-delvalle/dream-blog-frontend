/* import time from '../images/in-time.jpg'
import first from '../images/1.jpg'
import second from '../images/2.jpg'
import third from '../images/3.jpg'
import fourth from '../images/4.jpg' */
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'
import draftToHtml from 'draftjs-to-html'
import parse from 'html-react-parser';
import { FallingLines } from 'react-loader-spinner';


import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Main() {

  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [charged, setCharged] = useState(false);
  const [end, setENd] = useState(false);
  const [last, setLast] = useState('');
  const [newPost, setNewPost] = useState(0);

  useEffect(() =>{

    if(charged && newPost !== 0 ){
      fetch(`${process.env.REACT_APP_API}/read/latest/${last}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('last when it comes again: ', last);
        console.log('in the new article section ', data);
        //if(data.length === 1){return setENd(true)}    
        if(data.length === 2){
          setENd(true)
          return setArticle((curArticles) => [...curArticles, data[0]])}
        setArticle((curArticles) => [...curArticles, data[1]])
        
        //console.log('Value of LOADING: ', loading);
        //setLast(article[article.length-1]._id.toString()) 
        //console.log('new list: ', article); 
        console.log('latest: ', last) 
      })
    }
    
    if(!charged){
      fetch(`${process.env.REACT_APP_API}/read`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        setCharged(true)
        console.log('last in the array ', data[data.length-1]._id)
        setLast(data[data.length-1]._id.toString())
        console.log('last in the first round: ', last)
        console.log('data send: ', data[data.length-1]._id.toString());
        console.log('posts: ', data)
        console.log('first elemtn', data[0]);
        setLoading(false);
        return setArticle(data)
      })
    }
  }, [charged, newPost, last])

  //const images = [time, first, second, third, fourth]

  const setCookie = () => {
    console.log('inside cookie check HTTPONLY');

    axios.post(`${process.env.REACT_APP_API}/setcookie`, {
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      }
    })
    .then(response=> console.log(response))
  }

  const checkCookie = () => {
    axios.get(`${process.env.REACT_APP_API}/checkcookie`, {
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      }
    })
    .then(response=> console.log(response))
  }

  const deleteCookie = () => {
    console.log('inside cookie check HTTPONLY');

    axios.delete(`${process.env.REACT_APP_API}/deletecookie`, {
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      }
    })
    .then(response=> console.log(response))
  }

  let arts = article.map((elem) => 
    <li key={article.indexOf(elem)} className="top-article">
      <a href={`${process.env.REACT_APP_ORIGIN_PAGE}/post/${elem['_id']}`} className='postLink'> 
        <h2 className='post-title' >{elem['title']}</h2>
      </a>
        <div className='ssrr-article'>
        <img src={elem['images'][0]} alt="time" className='image' width='800px'></img>
          <div className='ssrr'>
              <img src={instagram} alt='fb' width='27px' className='ssrr-img'></img>
              <img src={facebook} alt='fb' width='27px' className='ssrr-img'></img>
              <img src={twitter} alt='fb' width='27px' className='ssrr-img'></img>
          </div>        
        </div>
        <p className='date'> Sun, {elem['date'].split('-')[2].slice(0, 2)}/{elem['date'].split('-')[1]}/{elem['date'].split('-')[0]}</p>
        <div className='post-article'>{parse(draftToHtml(elem['article']))[0]}</div>
        <h5 className='autor'>- {elem['autor']}</h5> 
    </li>
  )

  return (
  <div>

    <button style={{backgroundColor: "grey", padding: "1%", margin: "3%", display: "flex", alignItems: 'center', color: 'white', border: "none", borderRadius: '40px', cursor: 'pointer'}} onClick={setCookie}> Set Cookie </button>
    <button style={{backgroundColor: "grey", padding: "1%", margin: "3%", display: "flex", alignItems: 'center', color: 'white', border: "none", borderRadius: '40px', cursor: 'pointer'}} onClick={checkCookie}> Check Cookie Backend</button>
    <button style={{backgroundColor: "grey", padding: "1%", margin: "3%", display: "flex", alignItems: 'center', color: 'white', border: "none", borderRadius: '40px', cursor: 'pointer'}} onClick={deleteCookie}> Clear Cookie </button>


    <div className='article-section'>{arts}</div>
    {loading === true ? <div style={{textAlign: 'center', padding: '50px', fontSize: '30px', color: "gray", display: 'flex', justifyContent: "center", alignItems: "center"}}>
              <FallingLines
                  color="gray"
                  width="70"
                  visible={true}
                  ariaLabel='falling-lines-loading'
                                      />
    </div>  : end === true ? <p className='last'>──────────────────latest──────────────────</p> : <button onClick={()=> {
      setLoading(true);
      setNewPost(newPost + 1)
      setLast(article[article.length-1]._id.toString())
      console.log('articles when click: ', article);
      //setLoading(false);
      setTimeout(() => {
        setLoading(false)
      }, 2000);
      }} className='button-retrieve'> + </button>}
  </div>
  );
}