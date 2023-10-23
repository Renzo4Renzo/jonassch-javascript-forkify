// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import bookmarksView from './views/bookmarksView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    recipeView.renderSpinner();

    await model.loadRecipe(recipeId);

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const searchQuery = searchView.getQuery();
    if (!searchQuery) throw new Error();

    resultsView.renderSpinner();
    await model.loadSearchResults(searchQuery);

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  try {
    model.state.recipe.bookmarked ? model.deleteBookmark(model.state.recipe.id) : model.addBookmark(model.state.recipe);
    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (error) {
    bookmarksView.renderError();
  }
};

const controlLoadBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);
};

const init = function () {
  bookmarksView.addHandlerRender(controlLoadBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
