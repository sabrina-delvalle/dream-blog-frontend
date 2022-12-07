import React, { Component } from "react";
//import { useNavigate } from "react-router-dom";
import '../App.css'

export default class Auth extends Component {
  constructor(props){
    super(props);
    this.state ={name: ''}; 
    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  } 

  handleName(event) {
    this.setState({name: event.target.value})
  }

  handleSubmit(event){
    //console.log('A namd was submitted: ' + this.state.name)

    fetch('http://localhost:5000/header', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"/* ,
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhYnJpIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NjQyMDMxNzYsImV4cCI6MTY2NDIwMzM1Nn0.ZGfzHRM1eLy0-quwED3CaSC2_C9JL4XqMpRYUwgseH0" */
      }
    })
      .then(response => response.json())
      .then(data => console.log('response from backend server ', data))
    
      //this.props.navigate('/done')

      event.preventDefault();
  }

  render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit} className='centerForm'>
          <h1 className='center' > Register </h1>            
            <label className='blocks' name="name"> Name </label>             
              <input type='text' value={this.state.name} onChange={this.handleName} className='input' name="name"/>
            <input type="submit" value="Submit" className='submit' />
          </form>
        </div>
        );
  }
}

/* export function RegisterWithLogin (props){
  const navigate = useNavigate();
  return (
    <FormRegister navigate={navigate}/>
  )
} */