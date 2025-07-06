import './App.css';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import RecipeDetail from './pages/RecipeDetail';
import BMI from './pages/BMI';
import ProfilePage from './pages/ProfilePage';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

const App = () => {
  const [category, setCategory] = useState("");
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/api/recipes/:slug' element={<RecipeDetail />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/search" element={<SearchPage setCategory={setCategory} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/bmi" element={<BMI />} />
    </Routes>
  );
};

export default App;
