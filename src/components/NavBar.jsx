import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navBar.css';

const NavBar = ({ setCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">

        <li className="menu-item">
          <span className="menu-title">VEGETARIAN ▼</span>
          <ul className="dropdown">
            <li className="dropdown-item" onClick={() => handleCategoryClick("Rice Recipes")}>Rice Recipes</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Curries and Gravies")}>Curries and Gravies</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Breakfast")}>Breakfast</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Side Dish")}>Side Dish</li>
          </ul>
        </li>

        <li className="menu-item">
          <span className="menu-title">NON VEGETARIAN ▼</span>
          <ul className="dropdown">
            <li className="dropdown-item" onClick={() => handleCategoryClick("Chicken")}>Chicken</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Mutton")}>Mutton</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Fish")}>Fish</li>
          </ul>
        </li>

        <li className="menu-item">
          <span className="menu-title">SNACKS ▼</span>
          <ul className="dropdown">
            <li className="dropdown-item" onClick={() => handleCategoryClick("Chaat")}>Chaat</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Fast Food")}>Fast Food</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Fries")}>Fries</li>
          </ul>
        </li>

        <li className="menu-item">
          <span className="menu-title">BEVERAGES ▼</span>
          <ul className="dropdown">
            <li className="dropdown-item" onClick={() => handleCategoryClick("Tea/Coffee")}>Tea/Coffee</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Milkshake")}>Milkshake</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Juice")}>Juice</li>
          </ul>
        </li>

        <li className="menu-item">
          <span className="menu-title">INDIAN SWEETS ▼</span>
          <ul className="dropdown">
            <li className="dropdown-item" onClick={() => handleCategoryClick("Halwa")}>Halwa</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Payasam")}>Payasam</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Sweets")}>Sweets</li>
          </ul>
        </li>

        <li className="menu-item">
          <span className="menu-title">DESSERTS ▼</span>
          <ul className="dropdown">
            <li className="dropdown-item" onClick={() => handleCategoryClick("Ice Cream")}>Ice Cream</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Cake")}>Cake</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Cookies")}>Cookies</li>
          </ul>
        </li>

        <li className="menu-item">
          <span className="menu-title">HEALTH ▼</span>
          <ul className="dropdown">
            <li className="dropdown-item" onClick={() => handleCategoryClick("Salad")}>Salad</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Smoothie")}>Smoothie</li>
            <li className="dropdown-item" onClick={() => handleCategoryClick("Oats")}>Oats</li>
          </ul>
        </li>

        

      </ul>
    </nav>
  );
};

export default NavBar;
