//import logo from './road.webp';
import star from '../assets/images/5star.webp';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import Login from './Login';
import Restaurants from './Restaurants';
import AboutUs from './AboutUs';
import Start from './Start';
import homelogo from '../assets/images/road.png';
//import { useNavigate } from 'react-router-dom';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  //const navigate = useNavigate();
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
                <div className="text-center">
                  <h1 className="text-7xl font-bold text-gray-800 mb-4">5-3-1</h1>
                  <p className="text-xl text-gray-600 mb-8">Find the best restaurant for you, even when you can't decide.</p>
                  <Link
                    to="/start"
                    className="inline-block px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            }
          />
          <Route path="/start" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

