import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import { UserContext } from '../UserContext';
import axios from 'axios';
import Cookies from 'js-cookie'
import '../App.css'
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default function Login() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ logged, setLogged ] = useState(true);
    //const { logUser, setLogUser } = useContext(UserContext);


    function handleUsername(event) {
        setUsername(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

  async function handleSubmit(event){
    event.preventDefault();

    const userInfo = {
      username: username,
      password: password
    }
    console.log('user ', userInfo)
    console.log('user ', JSON.stringify(userInfo))

    const formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)
      
  axios.post('http://localhost:5000/login', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'plain/text'
    }
  })
      .then((res) => {
      console.log('axios ', res.data)
      if (res.data === 'invalid user or password') {
        console.log('wrong user or password, please try again')
        setLogged(false)
        setPassword('')
      } else {
        //setLogUser(true);
        //console.log(logUser);
        console.log('local storageee: ', res.data)
        localStorage.setItem('username', JSON.stringify(res.data.name))
        localStorage.setItem('userlastname', JSON.stringify(res.data.lastname))
        localStorage.setItem('image', JSON.stringify(res.data.image))
        Cookies.set('userSession', true, { expires: 365, secure: true, sameSite: 'strict' })
        setLogged(true)
        //this.props.navigate('/')
        //setLogUser(true);
        document.location.replace('/')
      }
      //setLogUser(true);
  })
        
}

    return (
    <div className='centerForm-login-section'>
          <form onSubmit={handleSubmit} className='centerForm-login'>
          <h1 className='center' > Login </h1>            
            <label className='blocks-login' name="username"> Username </label>             
              <input type='text' value={username} onChange={handleUsername} className='input-1-log' name="username"/>
            <label className='blocks-login' name="password"> Password </label>             
              <input type='password' value={password} onChange={handlePassword} className='input-1-log' name="password" placeholder='*******'/>
            {
              logged ? <p></p> : <p className="wrongPassword" >wrong user or password, please try again</p>
            }
            <input type="submit" value="OK" className='submit' />
          </form>
          <div>
            <p style={{color: '#86959a'}}>OR</p>
            <div className='ssrr-login'>
              <a href='/'><img src={instagram} alt='fb' width='27px' className='ssrr-img-login'></img></a>
              <a href='/'><img src={facebook} alt='fb' width='27px' className='ssrr-img-login'></img></a>
              <a href='/'><img src={twitter} alt='fb' width='27px' className='ssrr-img-login'></img></a>
            </div>
          </div>
    </div>
    )
}

export function LoginSession (props){
  const navigate = useNavigate();
  return (
    <Login navigate={navigate}/>
  )
}