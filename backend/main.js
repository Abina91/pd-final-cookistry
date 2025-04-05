const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");


// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images as static files

// DB connection (Fixed deprecation warnings)
mongoose.connect("mongodb://localhost:27017/cookistry")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to DB", err));

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Schema 
const recipeSchema = new mongoose.Schema({
    rid: { type: Number, required: true, unique: true },
    name: String,
    slug: String,
    ingredients: [String],
    category: String,
    tags: [String],  // Ensured it's an array
    description: String,
    cuisine: String, // Fixed spelling
    instructions: String,
    time: {
        serves: String,
        prep_time: String,   // Made consistent
        cook_time: String,
        total_time: String
    },
    imageURL: String
});

const Recipe = mongoose.model("RECIPE", recipeSchema);

// POST route to upload image & save recipe
app.post("/recipe", upload.single("image"), async (req, res) => {
    console.log("Inside post function", req.body);

    try {
        const newRecipe = new Recipe({
            rid: req.body.rid,
            name: req.body.name,
            slug: req.body.slug,
            ingredients: req.body.ingredients?.split?.(",") || req.body.ingredients || [],
            category: req.body.category,
            tags: req.body.tags?.split?.(",") || req.body.tags || [],
            description: req.body.description,
            cuisine: req.body.cuisine,
            instructions: req.body.instructions,
            time: {
                serves: req.body.serves,
                prep_time: req.body.prep_time,
                cook_time: req.body.cook_time,
                total_time: req.body.total_time
            },
            imageURL: req.file ? `/uploads/${req.file.filename}` : "" // ✅ Store file path
        });

        const savedRecipe = await newRecipe.save();
        res.json(savedRecipe);
    } catch (err) {
        console.error("Error saving recipe:", err);
        res.status(500).json({ error: "Failed to save recipe" });
    }
});


//GET all recipes
app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        console.error("Error fetching recipes:", err);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});

app.get("/api/recipes/:slug", async (req, res) => {
    console.log("Incoming request for slug:", req.params.slug); // Log incoming request

    try {
        const recipe = await Recipe.findOne({ slug: req.params.slug });

        if (!recipe) {
            console.log("Recipe not found for slug:", req.params.slug);
            return res.status(404).json({ error: "Recipe not found" });
        }

        console.log("Recipe found:", recipe);
        res.json(recipe);
    } catch (err) {
        console.error("Error fetching recipe:", err);
        res.status(500).json({ error: "Failed to fetch recipe" });
    }
});


// DELETE recipe by slug
app.delete("/recipe/:slug", async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findOneAndDelete({ slug: req.params.slug });
        if (!deletedRecipe) return res.status(404).json({ error: "Recipe not found" });
        res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
        console.error("Error deleting recipe:", err);
        res.status(500).json({ error: "Failed to delete recipe" });
    }
});
app.use(express.static("public"));
// Server
app.listen(3000, () => console.log("Server running on port 3000"));
