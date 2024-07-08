//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later! 

import ingredientsData from './data/ingredients.js';
// import recipeData from './data/recipes.js';

export const findRecipeIngredients = recipe => {
  var ingredientList = [];
  for (var i=0; i < recipe.ingredients.length; i++){
    var currentIngredient = ingredientsData.find((ingredient) => ingredient.id === recipe.ingredients[i].id);
    ingredientList.push(currentIngredient.name);
  }
  return ingredientList;
}

// Return a filtered list of recipes based on a tag. (Extension option: filtering by multiple tags)
export const findRecipeTag = (recipeList, tag) => {

  let thatRecipe = recipeList.filter((recipes) => {
    return recipes.tags.includes(tag)
  });
  let mapRecipe = thatRecipe.map((food) => {
    return { id: food.name, tags: food.tags }
    // return food.name
  });
  return mapRecipe
};

// console.log(findRecipeTag(recipeData, 'sauce'))

// Return a filtered list of recipes based on a recipe name. (Extension option: filtering by name or ingredients)

export const findRecipeName = (recipe, name) => {
  let thisRecipe = recipe.filter((recipes) => {
    if (recipes.name.includes(name)) {
      return recipe
    }
  });
  return thisRecipe
};

// console.log(findRecipeName(recipeData, 'Bang Bang Shrimp with Napa Cabbage Slaw'))
// Determine the names of ingredients needed for a given recipe.


// Get ingredients prices

export const findRecipePrice = (recipe) => {
  
  var pricePerIngredient = [];
  for (var i=0; i < recipe.ingredients.length; i++){
    var currentIngredient = ingredientsData.find((ingredient) => ingredient.id === recipe.ingredients[i].id);
    var priceForThisIngredient = (currentIngredient.estimatedCostInCents * recipe.ingredients[i].quantity.amount)
    pricePerIngredient.push(priceForThisIngredient);
  }
  var initVal = 0;
  var totalValue = pricePerIngredient.reduce((accumulatorVal,currentVal)=> accumulatorVal + currentVal, initVal,);
  return totalValue;
  
}