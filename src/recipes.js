import { ingredientsPromise, ingredientList, handleIngredients, handleRecipes, recipesPromise } from './apiCalls.js';
import ingredientsData from './data/ingredients.js';
import recipeData from './data/recipes.js';
Promise.all([ingredientsPromise]).then((values) => { handleIngredients(values) });
Promise.all([recipesPromise]).then((values) => { handleRecipes(values) });
let recipe = [];

export const findRecipeIngredients = (recipeName) => {

  recipe = recipeData.find((matchingName) => recipeName === matchingName.name);
  var listOfFoods = [];
  for (var i = 0; i < recipe.ingredients.length; i++) {
    var currentIngredient = ingredientsData.find((ingredient) => ingredient.id === recipe.ingredients[i].id);
    if (currentIngredient)
      listOfFoods.push(currentIngredient.name);
  }
  return listOfFoods;
};

export const findRecipeTag = (recipeList, tag) => {
  let recipeTag = recipeList.filter((recipes) => {
    return recipes.tags.includes(tag);
  });
  let newRecipeTag = recipeTag.map((food) => {
    return food.name;
  });
  return newRecipeTag;
};

export const findRecipeName = (recipeList, searchString) => {
  let recipes = recipeList.filter((recipe) => {
    if (recipe.name.toLowerCase().includes(searchString.toLowerCase())) {
      return true;
    }
  });
  return recipes;
};

export const findRecipePrice = (recipe) => {

  var totalValue = recipe.ingredients.reduce((accumulatorVal, currentIngredient) => {
    var foundIngredient = ingredientsData.find(ingredient => ingredient.id === currentIngredient.id)
    var priceForThisIngredient = foundIngredient.estimatedCostInCents * currentIngredient.quantity.amount
    return accumulatorVal + priceForThisIngredient
  }, 0)
  return totalValue
};

export const findRecipeInstructions = (recipe, recipeName) => {

  let userRecipe = recipe.find((recipes) => {
    return recipes.name === recipeName;
  })
  return userRecipe.instructions;
};

export const myUser = (id, name, recipesToCook = []) => {
  return {
    id,
    name,
    recipesToCook
  }
};

export const removeRecipeForUser = (user, recipe) => {
  if (user.recipesToCook.includes(recipe.id)) {
    user.recipesToCook.splice(user.recipesToCook.indexOf(recipe.id), 1)
  }
};

export {
  recipeData,
  ingredientList,
};