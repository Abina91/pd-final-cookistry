router.get('/recipes', async (req, res) => {
    try {
      const { subcategory } = req.query;
      let filter = {};
  
      if (subcategory) {
        filter = { name: { $regex: subcategory, $options: 'i' } }; 
        // You can match based on subcategory field too if you have it
      }
  
      const recipes = await Recipe.find(filter);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });
  