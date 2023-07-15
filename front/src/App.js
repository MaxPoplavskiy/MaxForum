import './App.css';
import { useState } from 'react';
import Navbar from "./components/navbar";
import Footer from './components/footer';
import Home from './components/home';
import Account from './components/account';
import PageNotFound from './components/pagenotfound';
import { Navigate, Route, Routes } from 'react-router-dom';
import { globalThemeContext } from "./globalThemeContext";
import "./themes.css";


function App(props) {
  const [theme, setTheme] = useState("light");
  
  return (
    <globalThemeContext.Provider value={theme}>
      <div className="App">
        <Navbar />
          
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          
        <Footer />
      </div>
    </globalThemeContext.Provider>
  );
}

export default App;
