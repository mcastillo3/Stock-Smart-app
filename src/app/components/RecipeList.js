import React from "react";
import { Typography, Paper, Box } from "@mui/material";

function RecipeList({ recipes }) {
  console.log("RecipeList received recipes:", recipes);

  if (!recipes || recipes.length === 0) {
    return <Typography>No recipes available</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {recipes.map((recipe, index) => (
        <Paper key={index} elevation={3} sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {recipe.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Ingredients:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mb: 2 }}>
            {recipe.ingredients
              .map((ingredient) => `• ${ingredient}\n`)
              .join("")}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Instructions:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {recipe.instructions}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default RecipeList;
