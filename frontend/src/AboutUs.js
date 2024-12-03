import React from 'react';
import Nat from './nat.png';
import Elaina from './elaina.jpg';
import Nyssa from './nyssa.jpg';
import Nancy from './nancy.jpg';

function AboutUs() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to 5-3-1! Our mission is to help you find the best restaurant on Green Street.</p>
      <p>We use the 5-3-1 rule to narrow down your options, ensuring you always make a great choice!</p>
      <p>Our team consists of passionate food lovers from UIUC, dedicated to making your dining decisions easier.</p>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <img src={Nat} alt="Nat" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
        <img src={Elaina} alt="Elaina" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
        <img src={Nyssa} alt="Nyssa" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
        <img src={Nancy} alt="Nancy" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
      </div>
    </div>
  );
}

export default AboutUs;
