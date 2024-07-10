//NOTE: Your DOM manipulation will occur in this file
import ingredientsData from './data/ingredients.js';
import recipeData from './data/recipes.js';
import { findRecipeIngredients, findRecipeTag, findRecipeName, findRecipePrice } from '../src/recipes.js';

// const allRecipesButton = document.querySelector('.all-recipes-button');
const allRecipesButton = document.querySelector('.allRecipes');
const recipeDisplaySection = document.querySelector('.recipe-list-display');
const recipeInfo = document.querySelector('.food-image')


// const recipeView = document.querySelector('')
//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.


const displayRecipes = () => {
  for (var i = 0; i < recipeData.length; i++) {
    var instructionText = [];
    recipeData[i].instructions.forEach((instructionData) => instructionText.push(`<br>` + instructionData.number + ' ' + instructionData.instruction));
    console.log(instructionText);
    //     recipeDisplaySection.innerHTML += `
    //     <section id=${recipeData[i].id}>
    //       <img class='food-image' id = 'foodImage-${recipeData[i].name}' src='${recipeData[i].image}'>
    //       <h2 class='food-name hidden' id = 'foodName-${recipeData[i].name}'>${recipeData[i].name}</h2>
    //       <h3 class='ingredients hidden' id = 'ingredients-${recipeData[i].name}'> ${findRecipeIngredients(recipeData[i].name)}</h3>
    //       <h3 class='instructions hidden' id = 'instructions-${recipeData[i].name}'> ${instructionText}</h3>
    //       <h3 class='total-price hidden'>Total price in American Cents : ${findRecipePrice(recipeData[i])} </h3>
    //       <h4 class='tags hidden'>${recipeData[i].tags} </h4>
    //       <br>
    //     </section>
    // `;
    recipeDisplaySection.innerHTML += `
    <article class="single-food">
      <section id=${recipeData[i].id}>
        <div class="food-name">
            <img class='food-image' id = 'foodImage-${recipeData[i].name}' src='${recipeData[i].image}'>
            <h2 class='food-name' id = 'foodName-${recipeData[i].name}'>${recipeData[i].name}</h2>
            <h3 class='total-price hidden'>Total price in American Cents : ${findRecipePrice(recipeData[i])} </h3>
        </div>
        <div class="food-ingredient">
          <h3 class='ingredients hidden' id = 'ingredients-${recipeData[i].name}'> ${findRecipeIngredients(recipeData[i].name)}</h3>
        </div>
        <div class="food-instructions">
          <h3 class='instructions hidden' id = 'instructions-${recipeData[i].name}'> ${instructionText}</h3>
        </div>
        <div class="food-tags">
          <h4 class='tags hidden'>${recipeData[i].tags} </h4>
        </div>
      </section>
    </article>
    `
    


    // var imageButton = document.querySelector(`#foodImage-${recipeData[i].name}`);
    // imageButton.addEventListener('click', showFullRecipe(recipeData[i].id));


    
  }
}



allRecipesButton.addEventListener('click', displayRecipes);




// showFullRecipe should take in the id of the recipe, find the corresponding section by id, then toggle each of the classes' visibility (except image) 




export {
  displayRecipes,
}



// As a user, I should be able to view all recipes.
// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)