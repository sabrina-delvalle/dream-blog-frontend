import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'
//import userImage from '../images/user.png'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner';


axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

class FormRegister extends Component {
  constructor(props){
    super(props);
    this.state ={name: '', lastname: '', username: '', email: '', password: '', profilePic: 'https://res.cloudinary.com/diyvxyidy/image/upload/v1671549902/users/user_bh6ggf.png', image: [], alertMessage: '', validUsername1: false, validUsername2: false, validEmail1: false, validEmail2: false, validPassword1: false, validProfilePic: false}; 
    
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
    this.setState({validProfilePic: true})
    //console.log('value of image: ', event.target)
    //this.setState({image: event.target.files[0]})

    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    axios.post(`${process.env.REACT_APP_API}/profilepic`, formData, { headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json"
    }})
    .then(response => {
      console.log(response);
      this.setState({profilePic: response.data.image})
      this.setState({image: response.data.image})
      this.setState({validProfilePic: false})
    })
    //console.log(event.target.files[0]);
    //console.log('image ', event.target.files[0])
  }

  handleUsername(event) {
      this.setState({username: event.target.value.toLowerCase()})
      if(event.target.value.length >= 6){
        this.setState({ validUsername1: true });
      }else{
        this.setState({ validUsername1: false });
      }
      fetch(`${process.env.REACT_APP_API}/checkuser`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          username: event.target.value.toLowerCase()
        }),
      })
      .then(response => response.json())
      .then(data => {
        data.valid ? this.setState({ validUsername2: true }) : this.setState({ validUsername2: false })
        //console.log('data from user server: ', data);
      })
  }

  handleEmail(event) {
    //verify then it can be accessed. no repeated current in use
    const lastChar = event.target.value.split('');
    const lastCharEmail = event.target.value.split('@');
    this.setState({ email: event.target.value })
    //console.log(lastCharEmail);
    if(lastChar.some(e => e === '@')){
      lastCharEmail[1].split('').some(e => e === ".") && lastCharEmail[1].split('.')[1].length >= 2   ? this.setState({validEmail1: true}) : this.setState({validEmail1: false}) 
    }

      fetch(`${process.env.REACT_APP_API}/checkuser`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: event.target.value
        }),
      })
      .then(response => response.json())
      .then(data => {
        data.valid ? this.setState({ validEmail2: true }) : this.setState({ validEmail2: false })
        //console.log('data from user server: ', data);
      })
  }

  handlePassword(event) {
    //less than 8 in red... simple text saying the charcateristics.
    this.setState({password: event.target.value})
    if(event.target.value.length < 8){
      this.setState({validPassword1:false})
    }else{
      this.setState({validPassword1:true})
    }
  }

  handleSubmit(event){

    event.preventDefault();
    console.log('A name was submitted: ' + this.state.name + ' and lastname: ' + this.state.lastname + ', username: ' + this.state.username + '\n email: ' + this.state.email + ', password: ' + this.state.password + ', image path: ' + this.state.image)

    if(this.state.username.length < 6 && this.state.password.length < 8){
      return this.setState({alertMessage: 'Please verify: username should be more than 6 chars and password more than 8 chars.'})
    } else if(this.state.username.length < 6 && this.state.validUsername2) {
      return this.setState({alertMessage: 'Please verify: user already exist'})
    } else if(this.state.password.length < 8) {
      return this.setState({alertMessage: 'Please verify: password should be more than 8 chars.'})
    }else if(!this.state.validEmail2){
      return this.setState({alertMessage: 'Please verify: email already exist.'})
    }

      const formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('lastname', this.state.lastname);
      formData.append('username', this.state.username);
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      formData.append('image', this.state.image);
      
      
      console.log('FORM  image from previous data: ', formData);

      
/*       const res = await axios.postForm('register', formData)
    console.log(res); */

    const postRegister = async () => {
      try{
        const awaitRegister = await axios.post(`${process.env.REACT_APP_API}/register`, formData, { headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json"
        }})
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        console.log(awaitRegister);
        this.props.navigate('/done') 
      }catch(err){
        console.log(err);
      }
    }
    postRegister();
  
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
                <input type='text' value={this.state.username} onChange={this.handleUsername} className={this.state.validUsername1 ? this.state.validUsername2  ? 'input-3' : 'input-2' : 'input-4'} name="username"/>
              <label className='blocks' name="email"> Email </label>             
                <input type='email' value={this.state.email} onChange={this.handleEmail} className={this.state.validEmail1 ? this.state.validEmail2 ? 'input-3' : 'input-2' : 'input-4'}  name="email" placeholder='@email.com'/>
              <label className='blocks' name="password"> Password </label>  
                <input type='password' value={this.state.password} onChange={this.handlePassword} className={this.state.validPassword1 ? 'input-3' : 'input-4'} name="password" placeholder='********'/>
                <img src={this.state.profilePic} className={this.state.validProfilePic ? "img-selector-off" : "img-selector"} width='130px' alt='user-profile-pic'></img>
                <div className={this.state.validProfilePic ? "loader-pic-on" : "loader-pic"} >
                <TailSpin
                  height="80"
                  width="80"
                  color="#4f5c61"
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                </div>
              <div className="img-btn-wrapper">
                <label className={this.state.validProfilePic ? "imageBtn-off" : "imageBtn"} name='profileImage' htmlFor='profileImage'>Update</label>
                <input type='file' name='profileImage' className={this.state.validProfilePic ? 'profile-image-off' : 'profile-image'} id='profileImage' onChange={this.handleImage} style={{color: 'transparent'}} value=''/>
              </div>          
              <div className="wrongPassword">{this.state.alertMessage}</div> 
              <input type="submit" value="Submit" className={ this.state.name && this.state.lastname && this.state.validUsername2 && this.state.validEmail2 && this.state.validPassword1 ? 'submit-register' : 'submit-register-off'  }/>
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