import React from "react";
import { useParams } from "react-router-dom";
import imageRef from "../images/4.jpg"
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'
import dots from '../images/dots-delete.png'
import emma from '../images/emma.jpg'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import draftToHtml from 'draftjs-to-html'
import parse from 'html-react-parser';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/json';

export default function Post() {

    const [ post, setPost ] = useState([]);
    const [textArea, setTextArea] = useState("");
    const [user, setUser] = useState(false);
    const [name, setName] = useState('Login');
    const [bearer, setBearer] = useState(undefined)
    let { id } = useParams();

    useEffect( () => {
        axios.get(`http://localhost:5000/post/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        .then(response => {
            console.log('before setting POST: ', response);
            setPost(response.data[0])
        })

        async function retrieveToken(){
            try{
              await axios.get('http://localhost:5000/token', {
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
              //.then(response => response.json())
      /*         .then(data=>{
                console.log('previous token, ', data);
                if(data['token']) {
                  setBearer(`Bearer ${data['token']}`)
                } */
              //console.log('token from API: ', token)
            }catch(err){
              console.log(err)
            }
          }
          retrieveToken()
      
          console.log('bearer, before get: ', bearer)
          
          if(bearer){
            console.log('its passing away');
            fetch('http://localhost:5000/user', {
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
             setUser(true)
           })
          } 
    }, [id, user, name, bearer])

    function handleComment() {
        
        console.log('on comment section: ', textArea)
        console.log('post comments array?', post['comments']);
        
        let comment = {   
                            user: {name: JSON.parse(localStorage.getItem('username')), profileImage:JSON.parse(localStorage.getItem('image'))}, 
                            comment: textArea,
                            date: new Date(),
                            replies: {list: ''}    
                        }
        post['comments'].push(comment);

        console.log('previous comment ', comment)
        
            fetch(`http://localhost:5000/comment/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text",
                },
                body: JSON.stringify(comment)
            })
         .then(response => response.text())
         .then(data => console.log(data))

/*         axios.patch(`http://localhost:5000/comment/${id}`, comment, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",   
            }
        })
        .then(response => console.log(response.data)); */

        setTextArea('')
    }

    function handleText(e) {
        setTextArea(e.target.value);
    }

    function handleDelete(e){
        console.log('element ', e)
        console.log(post);
        fetch(`http://localhost:5000/comment/delete/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({elem: e})
        })
        .then(response => response.json())
        .then(data => console.log(data))

        setPost([post['comments'].pop()])

    }


    return (
    <div className="article-section top-article">
        <h2 className='post-title'>{post.title}</h2>
        <div className='ssrr-article'>
            <img src={imageRef} alt="time" className='image' width='800px'></img>
{/*             <img src={post['image']} alt="time" className='image' width='800px'></img>
 */}                <div className='ssrr'>
                <a href='/'><img src={instagram} alt='fb' width='27px' className='ssrr-img'></img></a>
                <a href='/'><img src={facebook} alt='fb' width='27px' className='ssrr-img'></img></a>
                <a href='/'><img src={twitter} alt='fb' width='27px' className='ssrr-img'></img></a>
                </div>        
        </div>
        
        {/* <p className='date'> Sun fix, {post['date'].split('-')[2].slice(0, 2)}/{post['date'].split('-')[1]}/{post['date'].split('-')[0]} </p> */}
        {post['date'] ? <p className='date'> Sun fix, {post['date'].split('-')[2].slice(0, 2)}/{post['date'].split('-')[1]}/{post['date'].split('-')[0]} </p> : <p>Loading...</p>}
      
        <div className='post-article'>{parse(draftToHtml(post.article))}</div>
        <div className="user-id">
            <img src={emma} className="profile-img2" alt='user-img' width='80px'/>
            <p>{post.quote}</p>
            <p className="user-bio">Artista, escritora, más de 10 años en el entretenimiento Artista, escritora, más de 10 años en el entretenimiento</p>
            <h5 className='autor-2'> Autor: {post.autor}</h5>    
        </div>

        <div className="comments-wrapper">
            <p className="title-comments">Comments</p>
            {/* Here should be a comment... to render if saved inside post. */}
                <div className="comment">
                 { post['comments'] !== undefined ? <div>{ post['comments'].map((elem) => 
                                                    <div key={post['comments'].indexOf(elem)} >
                                                        <div className='comment-wrapper'>
                                                        {
                                                            user ? 
                                                            <img src={dots} alt='info-extra' className="dots-info" onClick={()=>handleDelete(elem)} /> 
                                                            : <p></p>
                                                        }
                                                        
                                                            <img src={elem['user'].profileImage} width="50px" alt='user-pic' className="comment-pic"/>
                                                            <p className="comment-1"> {elem['comment']} </p>
                                                        </div>
                                                        <p className="comment-date">Mon, Sep 30th, 2023</p>
                                                    </div>)
                                                    }</div> : <p>Loading...</p> }
                </div>                
        </div>
                {
                    user ? 
                    <div className="comments-wrapper"><textarea className="comments" placeholder="write comment" onChange={handleText} value={textArea}/>
                    <button className="post-button2" onClick={handleComment}>Post</button></div> 
                    :
                    <div  className="comments-wrapper-login">
                        <span><a href="http://localhost:3000/login" className="log-link2">Login</a> / <a href="http://localhost:3000/register" className="log-link2">Sign In</a></span>
                    </div> 
                }

    </div>
    );

} 