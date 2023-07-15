
import './App.css';
import Navbar from "./components/navbar";
import Footer from './components/footer';
import Home from './components/home';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <globalThemeContext.Provider value={globalTheme}>
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
