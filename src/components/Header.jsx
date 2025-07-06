import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // ⭐ Import user icon
import "../styles/header.css"; // your css file

const Header = () => {
  const [input, setInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${input}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setSidebarOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-section">
            <Link to="/">
              <img src="/assets/logo.jpg" alt="logo" className="logo-img" />
              <span className="app-title">COOKISTRY</span>
            </Link>
          </div>

          {/* Search */}
          <div className="search-section">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search recipes by name, ingredient, or tag..."
                className="search-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          </div>

          {/* Right-side links */}
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>

            {!isLoggedIn ? (
              <Link to="/login" className="nav-link">
                <User size={24} /> {/* ⭐ Show User Icon instead of "Login" */}
              </Link>
            ) : (
              <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                &#9776; {/* ☰ symbol */}
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Sidebar Menu */}
      {sidebarOpen && (
        <div className="sidebar">
          <Link to="/bmi" className="sidebar-link" onClick={() => setSidebarOpen(false)}>BMI Calculator</Link>
          <Link to="/favourites" className="sidebar-link" onClick={() => setSidebarOpen(false)}>Favourites</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Header;
