import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/recipeDetail.css";

const convertToEmbedURL = (url) => {
  if (!url) return null;
  const videoId = url.split("youtu.be/")[1]?.split("?")[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

const RecipeDetail = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setError("Recipe slug is missing.");
      setLoading(false);
      return;
    }

    console.log(`Fetching recipe for slug: ${slug}`);

    fetch(`/api/recipes/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched recipe data:", data);
        setRecipe(data);
        setLoading(false);
        fetchNutrition(data.ingredients);
      })
      .catch((err) => {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe. Please try again.");
        setLoading(false);
      });
  }, [slug]);

  const fetchNutrition = async (ingredients) => {
    if (!ingredients || ingredients.length === 0) return;

    try {
      const query = ingredients.join(", ");
      const res = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
        {
          headers: { "X-Api-Key": "yDU7dwx70N8by2ueW8Ud+Q==zCxFGXQTqDJxFOLa" },
        }
      );

      const result = await res.json();
      console.log("Fetched nutrition data:", result);

      if (result.items.length > 0) {
        const totalNutrients = result.items.reduce(
          (acc, item) => ({
            calories: acc.calories + item.calories,
            protein: acc.protein + item.protein_g,
            fat: acc.fat + item.fat_total_g,
            carbs: acc.carbs + item.carbohydrates_total_g,
            fiber: acc.fiber + (item.fiber_g || 0),
            sugar: acc.sugar + (item.sugar_g || 0),
            cholesterol: acc.cholesterol + (item.cholesterol_mg || 0),
          }),
          {
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
            fiber: 0,
            sugar: 0,
            cholesterol: 0,
          }
        );

        setNutritionData(totalNutrients);
      } else {
        setNutritionData(null);
      }
    } catch (err) {
      console.error("Error fetching nutrition:", err);
      setNutritionData(null);
    }
  };

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <Layout>
      <div className="recipe-name">
        <h1><strong>{recipe.name}</strong></h1>
      </div>

      <div className="recipe-description">
        <p>{recipe.description}</p>
      </div>

      <div className="image-container">
        {recipe.imageURL ? (
          <img src={recipe.imageURL} alt={recipe.name} className="recipe-image" />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div className="recipe-detail">
        <div className="time-container">
          <div className="serves">
            <p><strong>Serves:</strong> {recipe.time?.serves || "N/A"}</p>
            <hr className="solid" />
          </div>

          {recipe.time ? (
            <div className="time-details">
              <div className="time-column">
                <p><strong>Prep Time:</strong> {recipe.time.prepTime || "N/A"}</p>
              </div>
              <div className="time-column">
                <p><strong>Cook Time:</strong> {recipe.time.cookTime || "N/A"}</p>
              </div>
              <div className="time-column">
                <p><strong>Total Time:</strong> {recipe.time.totalTime || "N/A"}</p>
              </div>
            </div>
          ) : (
            <p>Loading time details...</p>
          )}
        </div>

        <hr className="solid" />
        <h2><strong>Ingredients</strong></h2>
        <hr className="solid" />
        <ul>
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <hr className="solid" />
        <h2><strong>Instructions</strong></h2>
        <hr className="solid" />
        <ol>
          {typeof recipe.instructions === "string"
            ? recipe.instructions.split(". ").map((step, index) => (
                <li key={index}>{step}</li>
              ))
            : recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
        </ol>

        {recipe.videoURL && (
          <>
            <hr className="solid" />
            <h2><strong>Recipe Video</strong></h2>
            <hr className="solid" />
            <div className="video-container">
              <iframe
                width="100%"
                height="400"
                src={convertToEmbedURL(recipe.videoURL)}
                title="Recipe Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}

        <hr className="solid" />
        <h2><strong>Nutrition Information</strong></h2>
        <hr className="solid" />
        {nutritionData ? (
          <div className="nutrition-info">
            <p><strong>Calories:</strong> {nutritionData.calories.toFixed(2)} kcal</p>
            <p><strong>Protein:</strong> {nutritionData.protein.toFixed(2)} g</p>
            <p><strong>Fat:</strong> {nutritionData.fat.toFixed(2)} g</p>
            <p><strong>Carbohydrates:</strong> {nutritionData.carbs.toFixed(2)} g</p>
            <p><strong>Fiber:</strong> {nutritionData.fiber.toFixed(2)} g</p>
            <p><strong>Sugar:</strong> {nutritionData.sugar.toFixed(2)} g</p>
            <p><strong>Cholesterol:</strong> {nutritionData.cholesterol.toFixed(2)} mg</p>
          </div>
        ) : (
          <p>No nutrition information available.</p>
        )}
      </div>
    </Layout>
  );
};

export default RecipeDetail;
