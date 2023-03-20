import { FridgeItem } from "./../constants/Types";

// TODO: Move to env
const ENDPOINT = "https://appwrite.filippofinke.ch/v1";
const PROJECT = "641856853e13dd73abb1";
const FUNCTION = "openai-recipes";

export default async function generateRecipe(items: Array<FridgeItem>) {
  console.log(
    "[openai-recipes] Generating recipe with ",
    items.length,
    " ingredients"
  );
  const response = await fetch(`${ENDPOINT}/functions/${FUNCTION}/executions`, {
    method: "POST",
    body: items.map((item) => item.product.product_name).join(","),
    headers: {
      "Content-Type": "text/json",
      "X-Appwrite-Project": PROJECT,
    },
  });

  try {
    const data = await response.json();
    console.log("[openai-recipes] ", data);
    if (data.response) {
      const { recipe } = JSON.parse(data.response);

      return recipe;
    }
  } catch (e) {
    console.log("[openai-recipes] Error", e);
  }
  return null;
}
