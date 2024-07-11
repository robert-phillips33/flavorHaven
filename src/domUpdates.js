
import ingredientsData from './data/ingredients.js';
import recipeData from './data/recipes.js';
import usersData from './data/users.js';
import { findRecipeIngredients, findRecipeTag, findRecipeName, findRecipePrice } from '../src/recipes.js';
import { result } from 'lodash';

// const allRecipesButton = document.querySelector('.all-recipes-button');
const allRecipesButton = document.querySelector('.allRecipes');
const recipeDisplaySection = document.querySelector('.recipe-list-display');
const searchUserRecipes = document.querySelector('#savedRecipeInput')

const searchRecipes = document.querySelector('#searchInput')

const searchUserRecipesBtn = document.querySelector('#user-recipe-search-button')

const searchRecipesBtn = document.querySelector('#quick-search-button')
const homeViewBtn = document.querySelector('.home-btn')
const homeView = document.querySelector('#home-page')
const savedHomeView = homeView.innerHTML;
const savedRecipes = document.querySelector('.user-recipes-button')
const userSearchDisplay = document.querySelector('.best-selection')
const breakfastTag = document.querySelector('.breakfast')
const sideTag = document.querySelector('.side-dish')
const lunchTag = document.querySelector('.lunch')
const appetizerTag = document.querySelector('.appetizer')
const dinnerTag = document.querySelector('.dinner')
const brunchTag = document.querySelector('.brunch')
const saladTag = document.querySelector('.salad')
const snackTag = document.querySelector('.snack')

// TODO: Replace with something that randomly selects, this is just for testing

let recipesToCook = [];

var currentRecipeSelection = recipeData;


const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

let currentUser = usersData[getRandomIndex(usersData)];
console.log(currentUser);




// searchRecipes.addEventListener
// const recipeView = document.querySelector('')
//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.

// As a user, I should be able to view all recipes.




const displayRecipes = () => {
  recipeDisplaySection.innerHTML = null;
  for (var i = 0; i < currentRecipeSelection.length; i++) {

    var instructionText = [];

    currentRecipeSelection[i].instructions.forEach((instructionData) => instructionText.push(`<br>` + instructionData.number + ' ' + instructionData.instruction));

    recipeDisplaySection.innerHTML += `
    <article class="single-food">
      <h3 class="click-save-text">DOUBLE CLICK IMAGE TO SAVE</h3>
      <section class="click-box" id='ID${currentRecipeSelection[i].id}'>
        <div class="food-name">
            <img class='food-image' id = 'foodImage${currentRecipeSelection[i].id}' src='${currentRecipeSelection[i].image}'>
            <h2 class='food-name hidden' id = 'foodName${currentRecipeSelection[i].id}'>${currentRecipeSelection[i].name}</h2>
            <button class='save-recipe hidden' id = 'saveRecipe${currentRecipeSelection[i].id}'>Save (or Unsave) This!</button>

            <h3 class='total-price hidden' id = 'foodPrice${currentRecipeSelection[i].id}'>Total price in American Cents : ${findRecipePrice(currentRecipeSelection[i])} </h3>
        </div>
        <div class="food-ingredient">
          <h3 class='ingredients hidden' id = 'ingredients${currentRecipeSelection[i].id}'> ${findRecipeIngredients(currentRecipeSelection[i].name)}</h3>
        </div>
        <div class="food-instructions">
          <h3 class='instructions hidden' id = 'instructions${currentRecipeSelection[i].id}'> ${instructionText}</h3>
        </div>
        <div class="food-tags">
          <h4 class='tags hidden'>${currentRecipeSelection[i].tags} </h4>
        </div>
      </section>
    </article>
    `;
  }
  allowToggle();
};

// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.

function showFullRecipe() {
  var valForID = this.idVal;
  var toggleTemp = document.querySelector(`#foodName${valForID}`);
  toggleTemp.classList.toggle("hidden");
  toggleTemp = document.querySelector(`#saveRecipe${valForID}`)
  toggleTemp.classList.toggle("hidden");

  toggleTemp = document.querySelector(`#foodPrice${valForID}`)
  toggleTemp.classList.toggle("hidden");

  toggleTemp = document.querySelector(`#ingredients${valForID}`)
  toggleTemp.classList.toggle("hidden");

  toggleTemp = document.querySelector(`#instructions${valForID}`)
  toggleTemp.classList.toggle("hidden");


};

function saveRecipe(){
  var valForID = this.idVal;
  var recipeToSave = recipeData.find((recipe)=> recipe.id === valForID);
  if(currentUser.recipesToCook.includes(recipeToSave))
  {
    currentUser.recipesToCook.splice(currentUser.recipesToCook.indexOf(recipeToSave), 1);
  }
  else{
    currentUser.recipesToCook.push(recipeToSave);
  }

}

allRecipesButton.addEventListener('click', allRecipesVis);
function allRecipesVis() {
  currentRecipeSelection = recipeData;
  displayRecipes();
}
var arrayOfRecipeImages = [];
var arrayOfRecipeButtons = [];


// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
function allowToggle() {
  for (var i = 0; i < currentRecipeSelection.length; i++) {
    arrayOfRecipeImages[i] = document.querySelector(`#foodImage${currentRecipeSelection[i].id}`);
    arrayOfRecipeImages[i].idVal = currentRecipeSelection[i].id;
    arrayOfRecipeImages[i].addEventListener('dblclick', showFullRecipe);
    arrayOfRecipeButtons[i] = document.querySelector(`#saveRecipe${currentRecipeSelection[i].id}`);
    arrayOfRecipeButtons[i].idVal = currentRecipeSelection[i].id;
    arrayOfRecipeButtons[i].addEventListener('click', saveRecipe);

  }
}


// showFullRecipe should take in the id of the recipe, find the corresponding section by id, then toggle each of the classes' visibility (except image)

// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)
const userInput = () => {
  const input = document.getElementById('searchInput').value
  // console.log('Bobers input:', input)
  currentRecipeSelection = recipeData.filter(recipe => recipe.name.includes(input))
  displayRecipes();
  // displayResults(results)
  // console.log('helooooooo')
};

searchRecipesBtn.addEventListener('click', userInput)




// filtering by tag

function findByTag() {
  var tagInput = this.tag;
  currentRecipeSelection = recipeData.filter(recipe => recipe.tags.includes(tagInput))
  displayRecipes();
};

const tagInitialize = () => {
  breakfastTag.tag = "breakfast";
  breakfastTag.addEventListener('click', findByTag);

  sideTag.tag = "side dish";
  sideTag.addEventListener('click', findByTag);

  lunchTag.tag = "lunch";
  lunchTag.addEventListener('click', findByTag);


  appetizerTag.tag = "appetizer";
  appetizerTag.addEventListener('click', findByTag);

  dinnerTag.tag = "dinner";
  dinnerTag.addEventListener('click', findByTag);

  brunchTag.tag = "brunch";
  brunchTag.addEventListener('click', findByTag);

  saladTag.tag = "salad";
  saladTag.addEventListener('click', findByTag);


  snackTag.tag = "snack";
  snackTag.addEventListener('click', findByTag);
};

tagInitialize();



//HOME button
const homePageView = () => {
  homeView.innerHTML = savedHomeView;
}
homeViewBtn.addEventListener('click', homePageView)

//SAVE RECIPES
const savedRecipesPage = () => {
  let savedRecipesView = document.querySelector('.saved-recipes')
  currentRecipeSelection = currentUser.recipesToCook;
  savedRecipesView.innerHTML = null;
  for (var i = 0; i < currentRecipeSelection.length; i++) {

    var instructionText = [];

    currentRecipeSelection[i].instructions.forEach((instructionData) => instructionText.push(`<br>` + instructionData.number + ' ' + instructionData.instruction));

    savedRecipesView.innerHTML += `
    <article class="single-food">
      <h3 class="click-save-text">DOUBLE CLICK IMAGE TO SAVE</h3>
      <section class="click-box" id='ID${currentRecipeSelection[i].id}'>
        <div class="food-name">
            <img class='food-image' id = 'foodImage${currentRecipeSelection[i].id}' src='${currentRecipeSelection[i].image}'>
            <h2 class='food-name hidden' id = 'foodName${currentRecipeSelection[i].id}'>${currentRecipeSelection[i].name}</h2>
            <button class='save-recipe hidden' id = 'saveRecipe${currentRecipeSelection[i].id}'>Save (or Unsave) This!</button>

            <h3 class='total-price hidden' id = 'foodPrice${currentRecipeSelection[i].id}'>Total price in American Cents : ${findRecipePrice(currentRecipeSelection[i])} </h3>
        </div>
        <div class="food-ingredient">
          <h3 class='ingredients hidden' id = 'ingredients${currentRecipeSelection[i].id}'> ${findRecipeIngredients(currentRecipeSelection[i].name)}</h3>
        </div>
        <div class="food-instructions">
          <h3 class='instructions hidden' id = 'instructions${currentRecipeSelection[i].id}'> ${instructionText}</h3>
        </div>
        <div class="food-tags">
          <h4 class='tags hidden'>${currentRecipeSelection[i].tags} </h4>
        </div>
      </section>
    </article>
    `;
  }
  allowToggle();
};

const recipesToCookFindByTag = () => {
  var tagInput = this.tag;
  currentRecipeSelection = recipeData.filter(recipe => (currentUser.recipesToCook.includes(recipe)) && (recipe.tags.includes(tagInput)))
  displayRecipes();
}
const recipesToCookFindByName = () => {
  const input = document.getElementById('savedRecipeInput').value
  // console.log('Bobers input:', input)
  currentRecipeSelection = recipeData.filter(recipe => (currentUser.recipesToCook.includes(recipe)) && (recipe.name.includes(input)));
  displayRecipes();
}

savedRecipes.addEventListener('click', savedRecipesPage)

searchUserRecipesBtn.addEventListener('click', recipesToCookFindByName)

const addToSavedRecipe = (recipe) => {
  if (!recipesToCook.includes(recipe)) {
    recipesToCook.push(recipe)
  }
}
export {
  displayRecipes,
  userInput,
  savedRecipesPage,
  addToSavedRecipe
  // changePageToHome
}