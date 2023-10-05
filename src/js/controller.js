const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const showRecipe = async function () {
  try {
    const rawResponse = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc3e'
    );
    const recipeData = await rawResponse.json();
    if (!rawResponse.ok)
      throw new Error(`${recipeData.message} (${rawResponse.status})`);

    let {
      data: { recipe },
    } = recipeData;
    const formattedRecipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(formattedRecipe);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
showRecipe();
