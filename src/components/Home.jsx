import { useState } from 'react';
import cover from '../assets/cover.jpg';
import './Home.css'; 

const Home = () => {
  const [showFeatures, setShowFeatures] = useState(false);

  const toggleFeatures = () => {
    setShowFeatures(!showFeatures);
    // Scroll to the features section when toggling showFeatures
    if (!showFeatures) {
      document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="Home-container">
      <div className='home-start'>
        <div className='home-text'>
          <h1>We Take Care Of Your Healthy Health</h1>
          <p>At <span>Dryp</span>, we are dedicated to providing reliable, up-to-date medical information to help you make informed health decisions. Our goal is to offer a comprehensive resource for all your healthcare needs, with expert advice and support at your fingertips.</p>
          <button className='btn-learn' onClick={toggleFeatures}>Learn More</button>
        </div>
        <div className='home-cover'>
          <img src={cover} alt='cover'/>
        </div>
      </div>
      
      <section id="features-section" className="features-section">
        <h2>Our Services</h2>
        <div className="features-container">
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3>Primary Care Services</h3>
              <li>Routine check-ups and examinations</li>
              <li>Vaccinations and immunizations</li>
            </div>
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fas fa-pills"></i> 
              </div>
              <h3>Specialist Consultations</h3>
              <li>Cardiology: Heart health assessments and treatments</li>
              <li>Dermatology: Skin conditions and cosmetic dermatology</li>
            </div>
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fas fa-stethoscope"></i> 
              </div>
              <h3>Diagnostic Services</h3>
              <li>Laboratory tests: Blood tests, urine analysis, etc.</li>
              <li>Imaging: X-rays, ultrasounds, CT scans, MRI scans</li>
            </div>
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fas fa-user-md"></i> 
              </div>
              <h3>Telemedicine</h3>
              <li>Virtual consultations with healthcare providers</li>
              <li>Remote monitoring of chronic conditions</li>
            </div>
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fas fa-ambulance"></i> 
              </div>
              <h3>Emergency Care</h3>
              <li>24/7 emergency services</li>
              <li>Treatment for acute illnesses and injuries</li>
            </div>
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fas fa-hospital"></i> {/* Example icon */}
              </div>
              <h3>Rehabilitation Services</h3>
              <li>Physical therapy</li>
              <li>Occupational therapy</li>
              <li>Speech therapy</li>
            </div>
          </div>
      </section>

      

      <footer className="footer">
        <p>&copy; 2024 Dryp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
