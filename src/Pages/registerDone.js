import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import '../App.css';
import {Link} from 'react-router-dom'

function Register() {
  return(
    <div>
      <Header/>
        <Link to='/'> 
          <h2 className={'done'} > Registration has been successful. </h2>
        </Link>
      <Footer/>      
    </div>
  )
}

export default Register;