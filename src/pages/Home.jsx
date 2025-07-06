import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/home.css";

const Home = ({ searchTerm, setSearchTerm }) => {
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12); // Show 12 recipes initially

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const term = searchTerm?.toLowerCase() || "";

    const matchName = recipe.name?.toLowerCase().includes(term);
    const matchIngredients = recipe.ingredients?.some((ing) =>
      ing.toLowerCase().includes(term)
    );
    const matchTags = recipe.tags?.some((tag) =>
      tag.toLowerCase().includes(term)
    );

    return matchName || matchIngredients || matchTags;
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <div className="home-page">
      <div class="intro-section">
  <h1>Simplify Indian cooking with Cookistry!</h1>
  <p>
    Say goodbye to overly complex recipes and lengthy ingredient lists. Discover authentic Indian dishes made easy with detailed, step-by-step instructions.
  </p>
  <p>
    Taste the richness of Indian cuisine without the overwhelm. Cookistry makes every dish approachable, delicious, and fun to cook.
  </p>
  <p>
    Whether you’re a beginner or a busy foodie, Cookistry helps you whip up flavorful Indian dishes in no time—with fewer ingredients and simple steps.
  </p>
  <p>
    From spicy curries to sweet delights, Cookistry brings the soul of Indian kitchens to your fingertips—made simple and satisfying.
  </p>
</div>


        <div className="latest-recipes">
          <h2>Latest Recipes</h2>
          <div className="recipes-grid">
            {filteredRecipes.slice(0, visibleCount).map((recipe) => (
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

          {visibleCount < filteredRecipes.length && (
            <button onClick={handleLoadMore} className="load-more-btn">
              Load More
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
