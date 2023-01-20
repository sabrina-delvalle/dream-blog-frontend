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


import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Main() {

  const [article, setArticle] = useState([]);
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
        return setArticle(data)
      })
    }
  }, [charged, newPost, last])

  //const images = [time, first, second, third, fourth]

  let arts = article.map((elem) => 
    <li key={article.indexOf(elem)} className="top-article">
      <a href={`${process.env.REACT_APP_ORIGIN_PAGE}/post/${elem['_id']}`} className='postLink'> 
        <h2 className='post-title' >{elem['title']}</h2>
      </a>
        <div className='ssrr-article'>
          <div className='ssrr'>
              <img src={instagram} alt='fb' width='27px' className='ssrr-img'></img>
              <img src={facebook} alt='fb' width='27px' className='ssrr-img'></img>
              <img src={twitter} alt='fb' width='27px' className='ssrr-img'></img>
          </div>        
        </div>
        <p className='date'> Sun, {elem['date'].split('-')[2].slice(0, 2)}/{elem['date'].split('-')[1]}/{elem['date'].split('-')[0]}</p>
        <div className='post-article'>{parse(draftToHtml(elem['article']))}</div>
        <h5 className='autor'>- {elem['autor']}</h5> 
    </li>
  )

  return (
  <div>
    <div className='article-section'>{arts}</div>

 {end === true ? <p className='last'>──────────────────latest──────────────────</p> : <button onClick={()=> {
      setNewPost(newPost + 1)
      setLast(article[article.length-1]._id.toString())
      console.log('articles when click: ', article);
      }} className='button-retrieve'> + </button>}
  </div>
  );
}