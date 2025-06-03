import "./App.css";
import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Pages/index";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Auth from "./Pages/auth";
import Done from "./Pages/registerDone";
import Confirmation from "./Pages/confirmation";
import NotFound from "./Pages/404_notfound";
import User from "./Pages/user";
import Profile from "./Pages/userprofile";
import PostPage from "./Pages/new-post";
import PostID from "./Pages/post";
import Account from "./Pages/account";
import { UserContext } from "./UserContext";
import ProtectedRoutes from "./ProtectedRoutes";
import userAuth from "./hooks/userAuth";

//import { QueryClient, QueryClientProvider } from 'react-query';

//const queryClient = new QueryClient();

function App() {
  const [logUser, setLogUser] = useState(userAuth);
  const providerValue = useMemo(
    () => ({ logUser, setLogUser }),
    [logUser, setLogUser]
  );

  return (
    <Router>
      <UserContext.Provider value={providerValue}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/post/:id" element={<PostID />} />
          <Route path="/done" element={<Done />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/new-post" element={<PostPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
