import logo from './road.webp';
import star from './5star.webp';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'; 
import { Link } from 'react-router-dom';
import Login from './Login';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/login" style={{ marginLeft: '20px' }}>Login</Link>
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

