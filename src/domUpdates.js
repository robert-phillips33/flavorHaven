
import ingredientsData from './data/ingredients.js';
import recipeData from './data/recipes.js';
import { findRecipeIngredients, findRecipeTag, findRecipeName, findRecipePrice } from '../src/recipes.js';
import { result } from 'lodash';

// const allRecipesButton = document.querySelector('.all-recipes-button');
const allRecipesButton = document.querySelector('.allRecipes');
const recipeDisplaySection = document.querySelector('.recipe-list-display');
const searchRecipes = document.querySelector('.input-bar')
const searchRecipesBtn = document.querySelector('.search-button')
const homeViewBtn = document.querySelector('.home-btn')
const homeView = document.querySelector('#home-page')
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
let recipesToCook = [];

var currentRecipeSelection = recipeData;

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
  toggleTemp = document.querySelector(`#foodPrice${valForID}`)
  toggleTemp.classList.toggle("hidden");

  toggleTemp = document.querySelector(`#ingredients${valForID}`)
  toggleTemp.classList.toggle("hidden");

  toggleTemp = document.querySelector(`#instructions${valForID}`)
  toggleTemp.classList.toggle("hidden");


};

allRecipesButton.addEventListener('click', allRecipesVis);
function allRecipesVis() {
  currentRecipeSelection = recipeData;
  displayRecipes();
}
var arrayOfRecipeImages = [];


// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
function allowToggle() {
  for (var i = 0; i < currentRecipeSelection.length; i++) {
    arrayOfRecipeImages[i] = document.querySelector(`#ID${currentRecipeSelection[i].id}`);
    arrayOfRecipeImages[i].idVal = currentRecipeSelection[i].id;
    arrayOfRecipeImages[i].addEventListener('dblclick', showFullRecipe);
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
  homeView.innerHTML = `
  <body id="home-page">
    <header>
      <div class="logo-container">
        <h1>Flavor Haven</h1>
      </div>
      <nav class="nav-list">
        <ul>
          <li><button class="home-btn">Home</button></li>
          <li><button class="aboutUs-btn">About Us</button></li>
        </ul>
      </nav>
    </header>
  <div class="dropdown">
    <button class="all-recipes-button">Recipes</button>
    <div class="dropdown-content">
      <table>
        <tr>
          <th>Meals</th>
          <th>Sides</th>
          <th><a href="#" class="allRecipes">All</a></th>
        </tr>
        <tr>
          <td><a href="#" class="breakfast">Breakfast</a></td>
          <td><a href="#" class="side-dish">Side Dish</a></td>
        </tr>
        <tr>
          <td><a href="#" class="lunch">Lunch</a></td>
          <td><a href="#" class="appetizer">Appetizer</a></td>
        </tr>
        <tr>
          <td><a href="#" class="dinner">Dinner</a></td>
          <td><a href="#" class="salad">Salad</a></td>
        </tr>
        <tr>
          <td><a href="#" class="brunch">Brunch</a></td>
          <td><a href="#" class="snack">Snack</a></td>
        </tr>
        </thead>
      </table>
    </div>
  </div>
  <button class="user-recipes-button">
    Saved Recipes
  </button>

  <section class="quick-search">
    <div class="container">
      <input class="input-bar" id="searchInput" type="text" placeholder="search for recipes here!">
      <button class="search-button">Search</button>
    </div>
  </section>
  <!-- TEST BELOW -->
  <section class="saved-recipes">

  </section>

  <!-- TEST ABOVE -->
  <section class="recipe-list-display"></section>

  <section class="best-selection">
    <h2>Best Selection</h2>
    <div class="best-selection-inner">
      <div class="container-best-select-imgs">
        <img class="best-select-actual-img" src="https://spoonacular.com/recipeImages/595736-556x370.jpg" alt="">
        <h3>Loaded Chocolate Chip Pudding Cookie Cups</h3>
        <p>Food Detail</p>
      </div>
      <div class="container-best-select-imgs">
        <img class="best-select-actual-img" src="https://spoonacular.com/recipeImages/678353-556x370.jpg" alt="">
        <h3>Maple Dijon Apple Cider Grilled Pork Chops</h3>
        <p>Food Detail</p>
      </div>
      <div class="container-best-select-imgs">
        <img class="best-select-actual-img" src="https://spoonacular.com/recipeImages/412309-556x370.jpeg" alt="">
        <h3>Dirty Steve's Original Wing Sauce</h3>
        <p>Food Detail</p>
      </div>
      <div class="container-best-select-imgs">
        <img class="best-select-actual-img" src="https://spoonacular.com/recipeImages/741603-556x370.jpeg" alt="">
        <h3>Elvis Pancakes</h3>
        <p>Food Detail</p>
      </div>
    </div>
  </section>
  <section class="food-blog">
    <h3>Food Blog</h3>
    <div class="food-blog-container">
      <div class="food-blog-text">
        <h1>Food img</h1>
        <p>These chicken skewers are a family favorite! Very easy, deliciously smoky, nice and sweet,
          with a good amount of spice and bite. Air fryer, grill, and oven-friendly!</p>
      </div>
      <img src="" alt="">
    </div>
    <div class="food-blog-container">
      <div class="food-blog-text">
        <img src="" alt="">
      </div>
      <h1>Food img</h1>
      <p>This Chicken Salad is so good! Protein-packed with a delicious creamy dressing,
        and perfect for an on-the-go lunch in a sandwich or wrap.
      </p>
    </div>
    <div class="food-blog-container">
      <div class="food-blog-text">
        <h1>Food img</h1>
        <p>This green rice is my FAVORITE! It’s packed with spinach and cilantro,
          perfectly spicy, nutritious, and goes with just about everything.
        </p>
      </div>
      <img src="" alt="">
    </div>
  </section>
  <section class="footer">
    <div class="social-icon">
      <ul>
        <li><img src="" class="icon" />Facebook</li>
        <li><img src="" class="icon" />Twitter</li>
        <li><img src="" class="icon" />Instagram</li>
      </ul>
    </div>
  </section>

</body>`
}
homeViewBtn.addEventListener('click', homePageView)

//SAVE RECIPES
const savedRecipesPage = () => {
  let savedRecipesView = document.querySelector('.saved-recipes')
  savedRecipesView.innerHTML = ``
}

savedRecipes.addEventListener('click', savedRecipesPage)

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