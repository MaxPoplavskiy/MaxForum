import './App.css';
import { useState } from 'react';
import Navbar from "./components/navbar";
import Footer from './components/footer';
import Home from './components/home';
import Account from './components/account';
import Posts from "./components/posts"
import CreatePost from './components/create-post';
import AuthForm from './components/authform';
import Post from './components/post';
import PageNotFound from './components/pagenotfound';
import { Navigate, Route, Routes } from 'react-router-dom';
import { globalThemeContext } from "./globalThemeContext";
import { authStatusContext } from "./authStatusContext";
import "./themes.css";
import Cookies from "universal-cookie";
import { SnackbarProvider } from 'notistack'
import axios from 'axios';

function App(props) {
  const cookies = new Cookies();


  function checkAuthStatus()
  {
    axios.post("http://localhost:3000/logged_in")
    .then((response) => {
      setAuthStatus(response.data.status);
      cookies.set("last-login-status", response.data.status);
      setUsername(response.data.username);
    });
  }
  

  const [theme, setTheme] = useState(cookies.get("theme"));
  const [username, setUsername] = useState("");


  const [authStatus, setAuthStatus] = useState(cookies.get("last-login-status"));
  checkAuthStatus();

  function changeTheme()
  {
    if(theme === "light")
    {
      setTheme("dark");
      cookies.set("theme", "dark");
    }
    else
    {
      setTheme("light");
      cookies.set("theme", "light");
    }
  }

  function requireAuth(nextState, replace, next) {
    if (!authStatus) {
      replace({
        pathname: "/login",
        state: {nextPathname: nextState.location.pathname}
      });
    }
    next();
  }

  return (
    <authStatusContext.Provider value={[authStatus, checkAuthStatus]}>
    <globalThemeContext.Provider value={theme}>
      <div className={"App" + (theme === "light" ? " light" : "")}>
        <SnackbarProvider />
        <Navbar username={username} />
          
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account themeButtonClick={changeTheme} />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:postName" element={<Post />} />
              <Route path="/my-posts/:userId" element={authStatus ? <Posts type="user-posts" /> : <Navigate to="/account" />} />
              <Route path="/my-posts/" element={authStatus ? <Navigate to={"/my-posts/" + username} /> : <Navigate to="/account" />} />
              <Route path="/create" element={authStatus ? <CreatePost /> : <Navigate to="/account" />} />
              <Route path="/login" element={!authStatus ? <AuthForm title="Login" /> : <Navigate to="/account" />} />
              <Route path="/register" element={!authStatus ? <AuthForm title="Register" /> : <Navigate to="/account" />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          
        <Footer />
      </div>
    </globalThemeContext.Provider>
    </authStatusContext.Provider>
  );
}

export default App;
