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
              <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-3xl w-full bg-white border-2 border-blue-900 shadow-2xl">
                  {/* Guest Check Header */}
                  <div className="border-b-2 border-blue-900 p-3 bg-white">
                    <div className="grid grid-cols-5 gap-2 text-xs text-blue-900 border-2 border-blue-900 mb-3 font-medium">
                      <div className="border-r border-blue-900 p-2">Date: 12/15/24</div>
                      <div className="border-r border-blue-900 p-2">Amount: $$$</div>
                      <div className="border-r border-blue-900 p-2">Guests: 1</div>
                      <div className="border-r border-blue-900 p-2">Server: 5-3-1</div>
                      <div className="p-2 text-red-600 font-bold text-lg">{checkNumber}</div>
                    </div>
                    <h1 className="text-5xl text-blue-900 text-center mb-3" style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>
                      Guest Check
                    </h1>
                    <div className="grid grid-cols-5 gap-2 text-xs text-blue-900 border-2 border-blue-900 font-medium">
                      <div className="border-r border-blue-900 p-2">Date: 12/15/24</div>
                      <div className="border-r border-blue-900 p-2">Table: 1</div>
                      <div className="border-r border-blue-900 p-2">Guests: 1</div>
                      <div className="border-r border-blue-900 p-2">Server: 5-3-1</div>
                      <div className="p-2 text-red-600 font-bold text-lg">{checkNumber}</div>
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
                  <div className="border-t-2 border-blue-900 p-3 text-center bg-green-50">
                    <p className="text-sm text-blue-900 font-bold">Thank You - Please Come Again</p>
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

