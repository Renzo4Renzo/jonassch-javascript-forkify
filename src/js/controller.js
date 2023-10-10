// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner();

    await model.loadRecipe(recipeId);

    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
