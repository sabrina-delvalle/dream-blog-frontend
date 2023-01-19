import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'
//import userImage from '../images/user.png'
import axios from 'axios'


axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

class FormRegister extends Component {
  constructor(props){
    super(props);
    this.state ={name: '', lastname: '', username: '', email: '', password: '', image: [], alertMessage: ''}; 
    
    this.handleName = this.handleName.bind(this);
    this.handleLastname = this.handleLastname.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleName(event) {
    if(event.target.value.length === 0) return this.setState({name: ''})
    let name = event.target.value[0].toUpperCase() + event.target.value.slice(1);
    this.setState({name: name})
  }

  handleLastname(event) {
    if(event.target.value.length === 0) return this.setState({lastname: ''})
    let lastname = event.target.value[0].toUpperCase() + event.target.value.slice(1);
    this.setState({lastname: lastname})
  }

  handleImage(event){
    //console.log('value of image: ', event.target)
    this.setState({image: event.target.files[0]})
    //console.log('image ', event.target.files[0])
  }

  handleUsername(event) {
      this.setState({username: event.target.value.toLowerCase()})
  }

  handleEmail(event) {
    this.setState({email: event.target.value}) //verify then it can be accessed. no repeated current in use
  }

  handlePassword(event) {
    //less than 8 in red... simple text saying the charcateristics.
    this.setState({password: event.target.value})

  }

  handleSubmit(event){

    event.preventDefault();
    console.log('A name was submitted: ' + this.state.name + ' and lastname: ' + this.state.lastname + ', username: ' + this.state.username + '\n email: ' + this.state.email + ', password: ' + this.state.password + ', image path: ' + this.state.image)

    if(this.state.username.length < 6 && this.state.password.length < 8){
      return this.setState({alertMessage: 'Please verify: username should be more than 6 chars and password more than 8 chars.'})
    } else if(this.state.username.length < 6) {
      return this.setState({alertMessage: 'Please verify: username should be more than 6 chars.'})
    } else if(this.state.password.length < 8) {
      return this.setState({alertMessage: 'Please verify: password should be more than 8 chars.'})
    }

      const formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('lastname', this.state.lastname);
      formData.append('username', this.state.username);
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      formData.append('file', this.state.image);
      
      
      console.log('FORM  image from previous data: ', formData);

      
/*       const res = await axios.postForm('register', formData)
    console.log(res); */


  axios.post(`${process.env.REACT_APP_API}/register`, formData, { headers: {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json"
  }})
      .then(response => console.log(response.data))
      .catch(err => console.log(err))
  
  this.props.navigate('/done') 
  //event.preventDefault();


/*      fetch('register', {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {console.log('response from backend server ', data)})  */
    
    //this.props.navigate('/done')

    //event.preventDefault();

  }



  render() {
      return (
        <div className="register">
          <form onSubmit={this.handleSubmit} className='centerForm'>
            <h1 className='center' > Register </h1>            
              <label className='blocks' name="name"> Name </label>             
                <input type='text' value={this.state.name} onChange={this.handleName} className='input-1' name="name"/>
              <label className='blocks' name="lastname"> Lastname </label>             
                <input type='text' value={this.state.lastname} onChange={this.handleLastname} className='input-1' name="lastname"/>
              <label className='blocks' name="username"> Username </label>             
                <input type='text' value={this.state.username} onChange={this.handleUsername} className='input-1' name="username"/>
              <label className='blocks' name="email"> Email </label>             
                <input type='email' value={this.state.email} onChange={this.handleEmail} className='input-1' name="email" placeholder='@email.com'/>
              <label className='blocks' name="password"> Password </label>  
                <input type='password' value={this.state.password} onChange={this.handlePassword} className='input-1' name="password" placeholder='*******'/>
              <div className="img-btn-wrapper">
                <label className="imageBtn" name='profileImage' htmlFor='profileImage'>Profile Image</label>
                <input type='file' name='profileImage' className='profile-image' id='profileImage' onChange={this.handleImage}/>
              </div>          
              <div className="wrongPassword">{this.state.alertMessage}</div> 
              <input type="submit" value="Submit" className='submit-register'/>
          </form>

          <div className='ssrr-register'>
              <a href='/'><img src={instagram} alt='fb' width='27px' className='ssrr-img-login'></img></a>
              <a href='/'><img src={facebook} alt='fb' width='27px' className='ssrr-img-login'></img></a>
              <a href='/'><img src={twitter} alt='fb' width='27px' className='ssrr-img-login'></img></a>
            </div>
        </div>
        );
  }
}

export function RegisterWithLogin (props){
  const navigate = useNavigate();
  return (
    <FormRegister navigate={navigate}/>
  )
}