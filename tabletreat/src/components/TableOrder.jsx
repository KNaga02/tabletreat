import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TableOrder.css";

export default function TableOrder() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });

  const [minDate, setMinDate] = useState("");
  const [minTime, setMinTime] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    setMinDate(`${yyyy}-${mm}-${dd}`);

    if (form.date === `${yyyy}-${mm}-${dd}`) {
      const hh = String(today.getHours()).padStart(2, "0");
      const min = String(today.getMinutes() + 1).padStart(2, "0");
      setMinTime(`${hh}:${min}`);
    } else {
      setMinTime("00:00");
    }
  }, [form.date]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation", {
      state: { orderType: "Table Reservation", details: form },
    });
  };

  return (
    <div className="table-order-container">
      {/* <button className="back-btn" onClick={() => navigate(-1)}>
        
      </button> */}

      <h1>Reserve a Table</h1>
      <form className="table-order-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          min={minDate}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          min={minTime}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="guests"
          min="1"
          max="20"
          value={form.guests}
          onChange={handleChange}
          required
        />
        <button type="submit" className="tt-btn">
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}
