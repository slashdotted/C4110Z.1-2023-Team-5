const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - object with request body data
    'env' - object with environment variables
  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200
  If an error is thrown, a response with code 500 will be returned.
*/

const getRecipe = async (ingredients) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Create a recipe for the following ingredients: ${ingredients}
If you use ingredients that are not listed by the user add them to the shoppingCart section of the Response.
YOU MUST RESPOND WITH JSON ONLY.
{
    "title": "Recipe title",
    "ingredients": [
        {
            "name": "Ingredient name",
            "quantity": "Ingredient quantity",
            "unit": "Ingredient unit"
        }
    ],
    "steps": [
        {
            "title": "Instruction title",
            "desciption": "Instruction description
        }
    ],
    "shoppingCart": [
        {
            "name": "Ingredient name",
            "quantity": "Ingredient quantity",
            "unit": "Ingredient unit"
        }
    ]
}`,
      },
    ],
  });

  return completion.data.choices[0].message.content.replaceAll("\n", "");
};

module.exports = async function (req, res) {
  if (!process.env.OPENAI_API_KEY) {
    return res.json({
      ok: false,
      error: "OPENAI_API_KEY is not set",
      env: process.env,
    });
  }

  const recipe = await getRecipe(req.payload);

  res.json({
    ok: true,
    recipe: JSON.parse(recipe),
  });
};
