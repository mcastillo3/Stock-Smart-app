import { NextResponse } from "next/server";
import { generateRecipes } from "../../../utils/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("API received pantry items:", body.pantryItems);

    const recipesText = await generateRecipes(body.pantryItems);
    const recipes = parseRecipes(recipesText);
    console.log("Parsed recipes:", JSON.stringify(recipes, null, 2));

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

function parseRecipes(recipesText: string): Recipe[] {
  const recipes: Recipe[] = [];
  const recipeRegex =
    /(.*?)\n\nIngredients:([\s\S]*?)Instructions:([\s\S]*?)(?=\n\n|$)/g;

  let match;

  while ((match = recipeRegex.exec(recipesText)) !== null) {
    let [_, name, ingredientsText, instructionsText] = match;

    // Remove "Recipe Name:" prefix if it exists
    name = name.replace(/^Recipe Name:\s*-?\s*/i, "").trim();

    const ingredients = ingredientsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-"))
      .map((line) => line.substring(1).trim());

    const instructions = instructionsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    recipes.push({
      name: name.trim(),
      ingredients,
      instructions: instructions.join("\n"),
    });
  }

  return recipes;
}

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
}
