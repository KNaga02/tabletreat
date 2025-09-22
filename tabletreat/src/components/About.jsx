import React from "react";
// import { useNavigate } from "react-router-dom";
import "./About.css";


export default function About() {
  // const navigate = useNavigate();

  return (
    <div className="about-container">
      {/* <button className="back-btn" onClick={() => navigate("/home")}>
        
      </button> */}

      <h1 className="about-title">About Us</h1>
      <p className="about-tagline">Bringing Flavors to Your Table Since 2005</p>

      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Welcome to <strong>TableTreat</strong>! Since 2024, we have been
          dedicated to serving delicious and hygienic food prepared with love.
          Our mission is to deliver authentic flavors and create unforgettable
          dining experiences for every guest.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Specialties</h2>
        <ul>
          <li>Authentic Indian Cuisine</li>
          <li>Signature Chicken Biryani</li>
          <li>Paneer Butter Masala</li>
          <li>Freshly Made Desserts</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To serve fresh, hygienic, and affordable food while making every meal
          special. We believe in quality ingredients, excellent service, and
          happy customers.
        </p>
      </section>

      <section className="about-section contact-info">
        <h2>Contact Us</h2>
        <p>📍 Hyderabad, India</p>
        <p>📞 +91 98765 43210</p>
        <p>📧 contact@tabletreat.com</p>
      </section>
    </div>
  );
}
