import 'regenerator-runtime/runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const rawResponse = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    const recipeData = await rawResponse.json();
    if (!rawResponse.ok)
      throw new Error(`${recipeData.message} (${rawResponse.status})`);

    const {
      data: { recipe },
    } = recipeData;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.log(error.message);
  }
};
