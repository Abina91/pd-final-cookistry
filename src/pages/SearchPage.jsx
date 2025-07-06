import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/home.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = ({ setCategory }) => {
  const query = useQuery();
  const searchTerm = query.get("q"); // ?q=pasta
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;

    fetch(`http://localhost:3000/api/recipes/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Search error:", err));
  }, [searchTerm]);

  return (
    <Layout setCategory={setCategory}>
      <div className="home-page">
        <h2>Search Results for: <em>{searchTerm}</em></h2>
        <div className="recipes-grid">
          {results.length > 0 ? (
            results.map((recipe) => (
              <div className="recipe-card" key={recipe._id}>
                <Link to={`/api/recipes/${recipe.slug}`}>
                  <img src={`http://localhost:3000${recipe.imageURL}`} alt={recipe.name} />
                  <p>{recipe.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No matching recipes found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
