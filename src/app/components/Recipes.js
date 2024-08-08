"use client";

import { Container, Typography } from "@mui/material";
import RecipeSuggestions from "./RecipeSuggestions";

export default function Recipes() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Recipes
      </Typography>
      <RecipeSuggestions />
    </Container>
  );
}
