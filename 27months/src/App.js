import React, { useState, useEffect } from 'react';
import './css.css';
import image1 from "./images/1.jpeg";
import image2 from "./images/1.jpeg";
import image3 from "./images/1.jpeg";
import image4 from "./images/1.jpeg";
import image5 from "./images/1.jpeg";
import image6 from "./images/1.jpeg";
import image7 from "./images/1.jpeg";
import image8 from "./images/1.jpeg";
import image9 from "./images/1.jpeg";
import image10 from "./images/1.jpeg";
import image11 from "./images/1.jpeg";
import image12 from "./images/1.jpeg";
import image13 from "./images/1.jpeg";
import image14 from "./images/1.jpeg";
import image15 from "./images/1.jpeg";
import image16 from "./images/1.jpeg";
import image17 from "./images/1.jpeg";
import image18 from "./images/1.jpeg";
import image19 from "./images/1.jpeg";
import image20 from "./images/1.jpeg";
import image21 from "./images/1.jpeg";
import image22 from "./images/1.jpeg";
import image23 from "./images/1.jpeg";
import image24 from "./images/1.jpeg";
import image25 from "./images/1.jpeg";
import image26 from "./images/1.jpeg";
import image27 from "./images/1.jpeg";

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.getElementById('messageModal');
      if (event.target === modal) {
        setShowModal(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div>
      <div id="hedlinecontainer">
        <div id="shine">Happy 27th Monthsary Tambokikay💖</div>
      </div>

      <div className="gallery">
        <img src={image1} alt='1'/>
        <img src={image2} alt='2'/>
        <img src={image3} alt='3'/>
        <img src={image4} alt='4'/>
        <img src={image5} alt='5'/>
        <img src={image6} alt='6'/>
        <img src={image7} alt='7'/>
        <img src={image8} alt='8'/>
        <img src={image9} alt='9'/>
        <img src={image10} alt='10'/>
        <img src={image11} alt='11'/>
        <img src={image12} alt='12'/>
        <img src={image13} alt='13'/>
        <img src={image14} alt='14'/>
        <img src={image15} alt='15'/>
        <img src={image16} alt='16'/>
        <img src={image17} alt='17'/>
        <img src={image18} alt='18'/>
        <img src={image19} alt='19'/>
        <img src={image20} alt='20'/>
        <img src={image21} alt='21'/>
        <img src={image22} alt='22'/>
        <img src={image23} alt='23'/>
        <img src={image24} alt='24'/>
        <img src={image25} alt='25'/>
        <img src={image26} alt='26'/>
        <img src={image27} alt='27'/>
      </div>

      <button className="msg-btn" onClick={() => setShowModal(true)}>📩 View Message</button>

      {showModal && (
        <div id="messageModal" className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Happy Monthsary 💌</h2>
            <p>
              Thank you for all the memories, love, and moments we've shared. 💕<br />
              I’m so grateful to have you in my life. Here's to many more months and years together! 💖
            </p>
          </div>
        </div>
      )}

      {/* Falling hearts */}
      <div className="heart" style={{ left: '10%', animationDelay: '0s' }}></div>
      <div className="heart" style={{ left: '20%', animationDelay: '2s' }}></div>
      <div className="heart" style={{ left: '30%', animationDelay: '4s' }}></div>
      <div className="heart" style={{ left: '40%', animationDelay: '1s' }}></div>
      <div className="heart" style={{ left: '50%', animationDelay: '3s' }}></div>
      <div className="heart" style={{ left: '60%', animationDelay: '5s' }}></div>
      <div className="heart" style={{ left: '70%', animationDelay: '6s' }}></div>
      <div className="heart" style={{ left: '80%', animationDelay: '2s' }}></div>
    </div>
  );
}

export default App;
