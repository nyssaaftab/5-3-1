import logo from './road.webp'; 
import './App.css';
import React from 'react'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>5-3-1</h1>
        <p>Find the best green street restaurant for you, even when you can't decide.</p>
        <img src={logo} alt="Logo" style={{ width: 'auto', height: '200px' }} />
      </header>
    </div>
  );
}

export default App;

