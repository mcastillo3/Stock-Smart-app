import dotenv from "dotenv";

dotenv.config();

export async function generateRecipes(pantryItems) {
  console.log("generateRecipes called with:", pantryItems);

  const ingredients = pantryItems.map((item) => item.name).join(", ");
  const promptTemplate = process.env.RECIPE_PROMPT;
  const prompt = promptTemplate.replace("{{ingredients}}", ingredients);

  try {
    console.log("Sending prompt to OpenRouter:", prompt);
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.SITE_URL,
          "X-Title": process.env.SITE_NAME,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `OpenRouter API error: ${response.status} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await response.json();
    console.log("OpenRouter API response:", data);
    const recipesText = data.choices?.[0]?.message?.content || "";
    console.log("Raw recipes text:", recipesText);
    return recipesText;
  } catch (error) {
    console.error("Detailed error in generateRecipes:", error);
    throw error;
  }
}
