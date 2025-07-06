# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/recipeDetail.css";

const RecipeDetail = () => {
  const { slug } = useParams(); // Get the recipe slug from the URL
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

    fetch(`/recipes/${slug}`)
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
        fetchNutrition(data.ingredients); // Fetch nutrition after loading recipe
      })
      .catch((err) => {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe. Please try again.");
        setLoading(false);
      });
  }, [slug]);

  // Fetch nutritional data
  const fetchNutrition = async (ingredients) => {
    if (!ingredients || ingredients.length === 0) return;

    try {
      const query = ingredients.join(", "); // Convert to a single query
      const res = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
        {
          headers: { "X-Api-Key": "yDU7dwx70N8by2ueW8Ud+Q==zCxFGXQTqDJxFOLa" }, // Replace with your API key
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

  if (loading) {
    return <p>Loading recipe details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

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
            <p><strong>Serves:</strong> {recipe.time?.serves}</p>
            <hr className="solid" />
          </div>

          {recipe?.time ? (
  <div className="time-details">
    <div className="time-column">
      <p><strong>Prep Time:</strong> {recipe.time?.prepTime}</p>
    </div>
    <div className="time-column">
      <p><strong>Cook Time:</strong> {recipe.time?.cookTime}</p>
    </div>
    <div className="time-column">
      <p><strong>Total Time:</strong> {recipe.time?.totalTime}</p>
    </div>
  </div>
) : (
  <p>Loading...</p>
)}

        </div>
        <hr className="solid" />
        <h2><strong>Ingredients</strong></h2>
        <hr className="solid" />
        <ul>
          {recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
          ) : (
            <p>No ingredients listed.</p>
          )}
        </ul>

        <h2><strong>Instructions</strong></h2>
        <hr className="solid" />
        <ol>
          {recipe.instructions
            .split(".")
            .map((step, index) => step && <li key={index}>{step.trim()}</li>)}
        </ol>

        {/* Nutrition Info Section */}
        {nutritionData && (
          <div className="nutrition-summary">
            <h2><strong>Nutrition Facts</strong></h2>
            <hr className="solid" />
            <table>
              <tbody>
                <tr>
                  <td>Total Calories:</td>
                  <td>{nutritionData.calories} kcal</td>
                </tr>
                <tr>
                  <td>Carbohydrates:</td>
                  <td>{nutritionData.carbs} g</td>
                </tr>
                <tr>
                  <td>Dietary Fiber:</td>
                  <td>{nutritionData.fiber} g</td>
                </tr>
                <tr>
                  <td>Sugars:</td>
                  <td>{nutritionData.sugar} g</td>
                </tr>
                <tr>
                  <td>Protein:</td>
                  <td>{nutritionData.protein} g</td>
                </tr>
                <tr>
                  <td>Total Fat:</td>
                  <td>{nutritionData.fat} g</td>
                </tr>
                <tr>
                  <td>Cholesterol:</td>
                  <td>{nutritionData.cholesterol} mg</td>
                </tr>
            
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecipeDetail;

