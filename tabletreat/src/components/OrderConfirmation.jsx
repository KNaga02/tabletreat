import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order, orderType, details } = location.state || {};

  // If no order or reservation info is found
  if (!order && !details) {
    return (
      <div className="confirmation-screen">
        <p>No order or reservation found.</p>
        {/* <button className="tt-btn" onClick={() => navigate("/home")}>
          Home
        </button> */}
      </div>
    );
  }

  return (
    <div className="confirmation-screen">
      {order && (
        <>
          <h1>Order Confirmed!</h1>
          <p>Thank you, {order.name}!</p>
          <p>Your Order ID: <strong>{order.id}</strong></p>

          <h2>Items Ordered:</h2>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>

          <p>Delivery Address: {order.address}</p>
          <p>Payment Method: {order.payment}</p>
        </>
      )}

      {details && (
        <>
          <h1>{orderType} Confirmed!</h1>
          <p>Thank you, {details.name}!</p>
          <div className="table-details">
            <p>Email: {details.email}</p>
            <p>Phone: {details.phone}</p>
            <p>Date: {details.date}</p>
            <p>Time: {details.time}</p>
            <p>Number of Guests: {details.guests}</p>
          </div>
        </>
      )}

      <button className="tt-btn" onClick={() => navigate("/home")}>
        Go Home
      </button>
    </div>
  );
}
