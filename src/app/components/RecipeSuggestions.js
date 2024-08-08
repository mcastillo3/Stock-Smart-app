"use client";

import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import RecipeList from "./RecipeList";

export default function RecipeSuggestions() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    fetchPantryItems();
  }, []);

  const fetchPantryItems = async () => {
    console.log("fetching...");
    try {
      const response = await fetch("/api/pantry");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched pantry items:", data.pantryItems);
      setPantryItems(data.pantryItems);
    } catch (error) {
      console.error("Error fetching pantry items:", error);
    }
  };

  const fetchRecipes = async () => {
    if (!pantryItems || pantryItems.length === 0) {
      console.error("No pantry items available");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending pantryItems to API:", pantryItems);
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pantryItems }),
      });
      console.log("API Response status:", response.status);
      const data = await response.json();
      console.log("Full API response:", data);
      console.log("Received recipes:", data.recipes);
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchRecipes}
        disabled={loading}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {loading ? "Fetching Recipes..." : "Get Recipe Suggestions"}
      </Button>
      {recipes.length > 0 && <RecipeList recipes={recipes} />}
    </>
  );
}
