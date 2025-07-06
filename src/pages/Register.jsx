import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // make sure you install it
import "../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      try {
        await axios.post('http://localhost:3000/api/register', {
          name,
          email,
          password,
        });

        alert("Registration successful! Please login.");
        navigate("/login"); // redirect to login page after registration
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Registration failed");
      }
    } else {
      setError("All fields are required!");
    }
  };

  return (
    <div className="login-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister} className="login-form">
        <div className="input-field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="login-btn">
          Register
        </button>
      </form>
      <p>
        <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
