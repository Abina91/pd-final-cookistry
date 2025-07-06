import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/home.css";

const CategoryPage = () => {
  const { categoryName } = useParams(); // get category from URL
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category === categoryName
  );

  return (
    <Layout>
      <div className="home-page">
        <div className="latest-recipes">
          <h2>{categoryName} Recipes</h2>
          <div className="recipes-grid">
            {filteredRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe._id}>
                <Link to={`/api/recipes/${recipe.slug}`}>
                  <img
                    src={`http://localhost:3000${recipe.imageURL}`}
                    alt={recipe.name}
                  />
                  <p>{recipe.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
