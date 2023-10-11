// import 'regenerator-runtime/runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const recipeData = await getJSON(`${API_URL}/${recipeId}`);

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
    throw error;
  }
};
