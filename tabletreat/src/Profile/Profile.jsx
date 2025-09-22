import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    location: "",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedIn || !savedUser) {
      navigate("/login");
    } else {
      setUser(savedUser);
      setIsEditing(!savedUser.gender || !savedUser.location); // if missing, force edit mode
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>

        {isEditing ? (
          <div className="profile-form">
            
            <div className="form-group">
              <label>Avatar</label>
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="avatar preview"
                  className="avatar-preview"
                />
              )}
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={user.location}
                onChange={(e) => setUser({ ...user, location: e.target.value })}
              />
            </div>

            <button className="tt-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <div className="profile-info">
            {user.avatar && (
              <img src={user.avatar} alt="avatar" className="avatar" />
            )}
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Location:</strong> {user.location}
            </p>

            <div className="profile-actions">
              <button className="tt-btn" onClick={handleEdit}>
                Edit
              </button>
              <button className="tt-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
