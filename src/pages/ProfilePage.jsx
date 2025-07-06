import React, { useEffect, useState } from "react";
import "../styles/profile.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "123-456-7890", // extra static detail
    address: "123 Main Street, Chennai", // extra static detail
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/profile");
        const data = await response.json();
        setProfile(prevProfile => ({
          ...prevProfile,
          name: data.name,
          email: data.email,
        }));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = () => {
    alert("Update profile clicked!");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <button onClick={updateProfile}>Update Profile</button>
      </div>
    </div>
  );
};

export default ProfilePage;
