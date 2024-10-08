import logo from './road.webp';
import star from './5star.webp';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import Login from './Login';


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="menu-icon" onClick={toggleMenu}>
              &#9776;
            </div>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <img src={star} alt="Star" style={{ width: 'auto', height: '100px' }} />
                  <h1>5-3-1</h1>
                  <p>Find the best Green Street restaurant for you, even when you can't decide.</p>
                  <img src={logo} alt="Logo" style={{ width: 'auto', height: '200px' }} />
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

