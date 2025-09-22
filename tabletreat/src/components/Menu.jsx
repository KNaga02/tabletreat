import React from "react";
// import { useNavigate } from "react-router-dom";
import "./Menu.css";
import Biryani from "../assets/Biryani.jpg";
import curry from "../assets/curry.jpg";
import pasta from "../assets/Pasta Alfredo.jpg";
import salad from "../assets/salad.jpg";

const dishes = [
  { id: 1, name: "Chicken Biryani", price: 250, image: Biryani },
  { id: 2, name: "Paneer Butter Masala", price: 180, image: curry },
  { id: 3, name: "Pasta Alfredo", price: 200, image: pasta },
  { id: 4, name: "Fresh Salad", price: 120, image: salad },
];

export default function Menu() {
  // const navigate = useNavigate();

  return (
    <div className="menu-screen">
      {/* <button className="back-btn" onClick={() => navigate("/home")}>
        
      </button> */}


      <h1 className="menu-title">Our Menu</h1>
      <div className="menu-grid">
        {dishes.map((dish) => (
          <div key={dish.id} className="menu-card">
            <img src={dish.image} alt={dish.name} className="menu-image" />
            <h3>{dish.name}</h3>
            <p>Price: ₹{dish.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
