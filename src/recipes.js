//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later! 
import { ingredientsPromise, ingredientList, handleIngredients, handleRecipes, recipeData, recipesPromise } from './apiCalls.js';
// import recipeData from './data/recipes.js';
// import ingredientsData from './data/ingredients.js';
//NEW DATA BEING IMPORTED//
import newRecipeData from './data/recipesSample.js';
import newIngredientsData from './data/ingredientsSample.js';



Promise.all([ingredientsPromise]).then((values) => {handleIngredients(values)});
Promise.all([recipesPromise]).then((values) => {handleRecipes(values)});
let recipe = [];


export const findRecipeIngredients = (recipeName) => {
  
  Promise.all([ingredientsPromise]).then((values) => {handleIngredients(values)});
  Promise.all([recipesPromise]).then((values) => {handleRecipes(values)});

  recipe = newRecipeData.find((matchingName) => recipeName === matchingName.name);
  var listOfFoods = [];
  for (var i = 0; i < recipe.ingredients.length; i++) {
    var currentIngredient = newIngredientsData.find((ingredient) => ingredient.id === recipe.ingredients[i].id);
    listOfFoods.push("" +currentIngredient.name);
  }
  return listOfFoods;
}


export const findRecipeTag = (recipeList, tag) => {
  Promise.all([ingredientsPromise]).then((values) => {handleIngredients(values)});
  Promise.all([recipesPromise]).then((values) => {handleRecipes(values)});
  

  let recipeTag = recipeList.filter((recipes) => {
    return recipes.tags.includes(tag)
  });
  let newRecipeTag = recipeTag.map((food) => {
    return food.name
  });
  return newRecipeTag
};


export const findRecipeName = (recipe, name) => {
  Promise.all([ingredientsPromise]).then((values) => {handleIngredients(values)});
  Promise.all([recipesPromise]).then((values) => {handleRecipes(values)});
  
  let recipeName = recipe.filter((recipes) => {
    if (recipes.name.includes(name)) {
      return recipe
    }
  });
  return recipeName
};


export const findRecipePrice = (recipe) => {
  Promise.all([ingredientsPromise]).then((values) => {handleIngredients(values)});
  Promise.all([recipesPromise]).then((values) => {handleRecipes(values)});
  

  var pricePerIngredient = [];
  for (var i = 0; i < recipe.ingredients.length; i++) {
    var currentIngredient = newIngredientsData.find((ingredient) => ingredient.id === recipe.ingredients[i].id);
    var priceForThisIngredient = (currentIngredient.estimatedCostInCents * recipe.ingredients[i].quantity.amount)
    pricePerIngredient.push(priceForThisIngredient);
  }
  var initVal = 0;
  var totalValue = pricePerIngredient.reduce((accumulatorVal, currentVal) => accumulatorVal + currentVal, initVal,);
  return totalValue;
  // var totalValue = recipe.ingredients.reduce((accumulatorVal, currentIngredient) => {
  //   var foundIngredient = newIngredientsData.find(ingredient => ingredient.id === currentIngredient.id)
  //   var priceForThisIngredient = foundIngredient.estimatedCostInCents * currentIngredient.quantity.amount
  //   return accumulatorVal + priceForThisIngredient
  // }, 0)
  // return totalValue
}

export const findRecipeInstructions = (recipe, recipeName) => {
  Promise.all([ingredientsPromise]).then((values) => {handleIngredients(values)});
  Promise.all([recipesPromise]).then((values) => {handleRecipes(values)});
  
  let userRecipe = recipe.find((recipes) => {
    return recipes.name === recipeName
  })
  return userRecipe.instructions
};

export{
  newRecipeData,
  recipeData,
  ingredientList,
}