import './App.css';
import { useState } from 'react';
import Navbar from "./components/navbar";
import Footer from './components/footer';
import Home from './components/home';
import { Route, Routes } from 'react-router-dom';
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
            </Routes>
          
        <Footer />
      </div>
    </globalThemeContext.Provider>
  );
}

export default App;
