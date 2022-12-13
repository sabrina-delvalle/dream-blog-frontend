import './App.css';
import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './Pages/index';
import Login from './Pages/login';
import Register from './Pages/register';
import Auth from './Pages/auth';
import Done from './Pages/registerDone'
import NotFound from './Pages/404_notfound';
import User from './Pages/user'
import Profile from './Pages/userprofile';
import PostPage from './Pages/new-post';
import PostID from './Pages/post';
import { UserContext } from './UserContext';
import ProtectedRoutes from './ProtectedRoutes';
import userAuth from './hooks/userAuth';

function App() {

    const [logUser, setLogUser] = useState(userAuth);
    const providerValue = useMemo(() => ({logUser, setLogUser}), [logUser, setLogUser])


  return (
    <Router>
        <UserContext.Provider value={providerValue}>
          <Routes>
            <Route path='/' element={<Index/>} />
            <Route path='https://dreamblog.onrender.com/login' element={<Login/>} />
            <Route path='https://dreamblog.onrender.com/register' element={<Register/>} />
            <Route path='https://dreamblog.onrender.com/auth' element={<Auth/>} />
            <Route path='https://dreamblog.onrender.com/user/:id' element={<User />} />
            <Route path='https://dreamblog.onrender.com/post/:id' element={<PostID />} />
            <Route path='https://dreamblog.onrender.com/done' element={<Done />} />

            <Route element={<ProtectedRoutes/>}>
              <Route path='https://dreamblog.onrender.com/new-post' element={<PostPage/>} />  
              <Route path='https://dreamblog.onrender.com/profile' element={<Profile/>} /> 
            </Route>
          
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </UserContext.Provider>
    </Router>
  );
}

export default App;
