import Js from '../assets/Js.jpg';
import Jd from '../assets/Jd.jpg';
import Ew from '../assets/Ew.jpg';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to Dryp, where we are dedicated to providing the highest quality healthcare for you and your family. Our team of experienced physicians and healthcare professionals is here to offer a wide range of medical services tailored to meet your needs.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to deliver compassionate and comprehensive healthcare, ensuring that each patient receives personalized attention and care. We strive to promote wellness and improve the quality of life for our community.
      </p>

      <h2>Meet Our Team</h2>
      <div className="team">
        <div className="team-member">
          <img src={Js} alt="Dr. John Smith" />
          <h3>Dr. John Smith, MD</h3>
          <p>Board-certified in Family Medicine with over 20 years of experience.</p>
        </div>
        <div className="team-member">
          <img src={Jd} alt="Dr. Jane Doe" />
          <h3>Dr. Jane Doe, MD</h3>
          <p>Pediatrician with a passion for children&apos;s health and well-being.</p>
        </div>
        <div className="team-member">
          <img src={Ew} alt="Dr. Emily White" />
          <h3>Dr. Emily White, MD</h3>
          <p>Specialist in Women&apos;s Health, focusing on comprehensive care for women.</p>
        </div>
      </div>
    </div>
  );
};

export default About;