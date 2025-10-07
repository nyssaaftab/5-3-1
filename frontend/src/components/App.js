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
  const [checkNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));
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
              <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="max-w-3xl w-full bg-green-50 border-l-4 border-r-4 border-blue-900 shadow-2xl">
                  {/* Guest Check Header */}
                  <div className="border-b-4 border-blue-900 p-4 bg-green-50">
                    <div className="grid grid-cols-3 gap-2 text-xs text-blue-900 mb-2">
                      <span>CHECK #{checkNumber}</span>
                      <span className="text-center">WELCOME</span>
                      <span className="text-right">SERVER: 5-3-1</span>
                    </div>
                    <h1 className="text-6xl font-bold text-blue-900 text-center mb-2" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                      5-3-1
                    </h1>
                    <div className="grid grid-cols-3 gap-2 text-xs text-blue-900">
                      <span>PARTY SIZE: ANY</span>
                      <span className="text-center">CUISINE: ALL</span>
                      <span className="text-right">DATE: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="p-8 text-center bg-green-50">
                    <p className="text-xl text-gray-700 mb-8 leading-relaxed">Can't decide where to eat? We'll help! Enter your location and preferences, and we'll show you 5 random restaurants. Pick your top 3 favorites, then let us choose 1 for you. No more dinner debates—just great food.</p>
                    <Link
                      to="/start"
                      className="inline-block px-12 py-4 bg-blue-900 text-white font-semibold text-lg hover:bg-blue-800 transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>

                  {/* Guest Check Footer */}
                  <div className="border-t-4 border-blue-900 p-4 text-center bg-green-50">
                    <p className="text-sm text-blue-900 font-semibold">THANK YOU - PLEASE COME AGAIN</p>
                  </div>
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

