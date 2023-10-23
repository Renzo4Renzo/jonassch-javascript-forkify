// import 'regenerator-runtime/runtime';
import { API_URL, API_KEY, RESULTS_PER_PAGE } from './config';
import { getJSON, postJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (recipeData) {
  const {
    data: { recipe },
  } = recipeData;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (recipeId) {
  try {
    const recipeData = await getJSON(`${API_URL}${recipeId}`);
    state.recipe = createRecipeObject(recipeData);
    state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === recipeId) ? true : false;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const searchData = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = searchData.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = (ingredient.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

export const addBookmark = function (recipe) {
  state.bookmarks.push({ id: recipe.id, image: recipe.image, title: recipe.title, publisher: recipe.publisher });
  state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (recipeId) {
  const index = state.bookmarks.findIndex(recipe => recipe.id === recipeId);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = newRecipe
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const ingredientArray = ingredient[1].replaceAll(' ', '').split(',');
        if (ingredientArray.length !== 3) {
          throw new Error('Wrong ingredient format! Please use the correct format!');
        }
        const [quantity, unit, description] = ingredientArray;
        return { quantity: quantity ? Number(quantity) : null, unit, description };
      });

    const newRecipeObject = Object.fromEntries(newRecipe);
    const recipe = {
      title: newRecipeObject.title,
      source_url: newRecipeObject.sourceUrl,
      image_url: newRecipeObject.image,
      publisher: newRecipeObject.publisher,
      cooking_time: Number(newRecipeObject.cookingTime),
      servings: Number(newRecipeObject.servings),
      ingredients,
    };

    const responseData = await postJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(responseData);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
