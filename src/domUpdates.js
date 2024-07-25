
import { userPromise, currentUser, userList, ingredientList,recipesChosen, featuredRecipes, randomUser, recipeData, recipesPromise, ingredientsPromise, getUsers, postTestUser, postRecipeToUser } from './apiCalls.js';
import { findRecipeIngredients, findRecipeTag, findRecipeName, findRecipePrice } from '../src/recipes.js';
import { result } from 'lodash';

// const allRecipesButton = document.querySelector('.all-recipes-button');
const allRecipesButton = document.querySelector('.allRecipes');
const recipeDisplaySection = document.querySelector('.recipe-list-display');
const searchUserRecipes = document.querySelector('#savedRecipeInput');
const aboutUs = document.querySelector('.aboutUs-btn');
const logIn = document.querySelector('.logged-in-as');
const searchRecipes = document.querySelector('#searchInput');
const searchUserRecipesBtn = document.querySelector('#user-recipe-search-button');
const savedRecipesView = document.querySelector('.saved-recipes');
const searchRecipesBtn = document.querySelector('#quick-search-button');
// const homeViewBtn = document.querySelector('.home-btn');
// const homeView = document.querySelector('#home-page');
const savedRecipes = document.querySelector('.user-recipes-button');
const savedRecipes2 = document.querySelector('.user-recipes-button2');
const userSearchDisplay = document.querySelector('.best-selection');
const emailSignUp = document.querySelector('#email-input')
const emailSignUpBtn = document.querySelector('#email-button')
const bestSelectionName = document.querySelector('.best-select-name')
const bestSelectionNameTwo = document.querySelector('.best-select-name-2')
const bestSelectionNameThree = document.querySelector('.best-select-name-3')
const bestSelectionNameFour = document.querySelector('.best-select-name-4')
const aboutUsView = document.querySelector('.about-us')
const bestSelectionInner = document.querySelector('.best-selection-inner')
var addItemButton = document.querySelector('.aboutUs-btn');
var addItemButton2 = document.querySelector('.aboutUs-btn2');
// var addItemButton3 = document.querySelector('.aboutUs-btn3');


let recipesToCook = [];

// addItemButton.addEventListener('click', postTestUser);
// addItemButton2.addEventListener('click', getUsers);
// addItemButton.addEventListener('click', postTestUser);

var currentRecipeSelection = recipeData;
Promise.all([userPromise]).then((values) => { randomUser(values) });
Promise.all([recipesPromise]).then((values) => { featuredRecipes(values) }).then((values)=>{allBestSelections()});

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};


Promise.all([userPromise]).then((values) => { handleData(values) });


const handleData = (response) => {
  // userList = response[0];
  console.log(currentUser);
  logIn.innerHTML = currentUser.name;
};



const displayRecipes = () => {
  savedRecipesView.innerHTML = null;
  recipeDisplaySection.innerHTML = null;
  for (var i = 0; i < currentRecipeSelection.length; i++) {

    var instructionText = [];

    currentRecipeSelection[i].instructions.forEach((instructionData) => instructionText.push(`<br>` + instructionData.number + '.) ' + instructionData.instruction));
    var recipeIngredients = findRecipeIngredients(currentRecipeSelection[i].name);
    var ingredientListForRecipe = [];
    recipeIngredients.forEach((ingredientVar) => ingredientListForRecipe.push(`<br> <span>&#8594;</span> ` +ingredientVar));
    console.log(ingredientListForRecipe)
   

    recipeDisplaySection.innerHTML += `
    <section class="card mb-2 single-food">
        <div class="click-box" id='ID${currentRecipeSelection[i].id}'>
          <img class='card-img-top food-image' id='foodImage${currentRecipeSelection[i].id}' src='${currentRecipeSelection[i].image}' alt='Food Image'>
          <div class="card-body">
            <h5 class='card-title food-name' id='foodName${currentRecipeSelection[i].id}'>${currentRecipeSelection[i].name}</h5>
            <button class='btn btn-primary save-recipe hidden' id='saveRecipe${currentRecipeSelection[i].id}'>Save This Recipe!</button>
            <p class='card-text total-price hidden' id='foodPrice${currentRecipeSelection[i].id}'>Total price $: ${centsToDollarAmount(findRecipePrice(currentRecipeSelection[i])).toFixed(2)}</p>
            <p class='card-text ingredients hidden' id='ingredients${currentRecipeSelection[i].id}'>${ingredientListForRecipe}</p>
            <p class='card-text instructions hidden' id='instructions${currentRecipeSelection[i].id}'>${instructionText}</p>
            <p class='card-text tags hidden'>${currentRecipeSelection[i].tags}</p>
          </div>
        </div>
    </section>
`;
  }
  allowToggle();
};

// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.

function showFullRecipe() {
  var valForID = this.idVal;
  
  var toggleTemp = toggleTemp = document.querySelector(`#saveRecipe${valForID}`);
  toggleTemp.classList.toggle("hidden");

  toggleTemp = document.querySelector(`#foodPrice${valForID}`);
  toggleTemp.classList.toggle("hidden");

  toggleTemp = document.querySelector(`#ingredients${valForID}`);
  toggleTemp.classList.toggle("hidden");

  toggleTemp = document.querySelector(`#instructions${valForID}`);
  toggleTemp.classList.toggle("hidden");

};

function saveRecipe() {
  var valForID = this.idVal;
  console.log(recipeData)

  var recipeToSave = recipeData.find((recipe) => recipe.id === valForID);
console.log(valForID)
console.log(recipeToSave)
console.log(recipeData)
  if (currentUser.recipesToCook.includes(recipeToSave)) {
    currentUser.recipesToCook.splice(currentUser.recipesToCook.indexOf(recipeToSave), 1);

  }
  else {
    currentUser.recipesToCook.push(recipeToSave);
  }
  postRecipeToUser(currentUser, recipeToSave); // from api calls to save recipe to user.
};

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
    arrayOfRecipeImages[i].addEventListener('click', showFullRecipe);
    arrayOfRecipeButtons[i] = document.querySelector(`#saveRecipe${currentRecipeSelection[i].id}`);
    arrayOfRecipeButtons[i].idVal = currentRecipeSelection[i].id;
    arrayOfRecipeButtons[i].addEventListener('click', saveRecipe);
  }
};

// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)
const userInput = () => {
  const input = document.getElementById('searchInput').value   // users search input ->
  currentRecipeSelection = findRecipeName(recipeData, input)   // the input becomes an argument in the function ->
  if(currentRecipeSelection.length === 0) {    
    alert('(⊙︿⊙) None of our recipes match your input (⊙︿⊙)') // findRecipeName creates an array that returns a recipe name if its true ->                                                               // if the array is 0 meaning the recipe is not there, the alert pops up telling -
  }                                                            // the user no recipes matching your search

  displayRecipes();
};

searchRecipesBtn.addEventListener('click', userInput)

// filtering by tag

function findByTag(tagInput) {
  currentRecipeSelection = recipeData.filter(recipe => recipe.tags.includes(tagInput))
  displayRecipes();
};
function recipesToCookFindByTag(tagInput) {
  currentRecipeSelection = recipeData.filter(recipe => (currentUser.recipesToCook.includes(recipe)) && (recipe.tags.includes(tagInput)))
  displayRecipes();
};

const tagInitialize = () => {
  // add an event listener to each tag button to search
  document.querySelectorAll(".tag")
    .forEach(element => {
      element.addEventListener('click', (e) => findByTag(e.target.dataset.tag))
    })

  // add an event listener to each tag button to search
  document.querySelectorAll(".recipe-tag")
    .forEach(element => {
      element.addEventListener('click', (e) => recipesToCookFindByTag(e.target.dataset.tag))
    })
};

tagInitialize();


//SAVE RECIPES
const savedRecipesPage = () => {
  currentRecipeSelection = currentUser.recipesToCook;
  savedRecipesView.innerHTML = null;
  recipeDisplaySection.innerHTML = null;

  for (var i = 0; i < currentRecipeSelection.length; i++) {

    var instructionText = [];

    currentRecipeSelection[i].instructions.forEach((instructionData) => instructionText.push(`<br>` + instructionData.number + '.) ' + instructionData.instruction));
    
    savedRecipesView.innerHTML += `
  <section class="single-food">
    <section class="click-box" id='ID${currentRecipeSelection[i].id}'>
      <div class="food-image-container">
        <img class='food-image' id='foodImage${currentRecipeSelection[i].id}' src='${currentRecipeSelection[i].image}' alt='${currentRecipeSelection[i].name}'>
      </div>
      <div class="food-details">
        <h2 class='food-name' id='foodName${currentRecipeSelection[i].id}'>${currentRecipeSelection[i].name}</h2>
        <button class='save-recipe hidden' id='saveRecipe${currentRecipeSelection[i].id}'>Unsave This Recipe!</button>
        <h3 class='total-price hidden' id='foodPrice${currentRecipeSelection[i].id}'>Total price $: ${centsToDollarAmount(findRecipePrice(currentRecipeSelection[i])).toFixed(2)}</h3>
      </div>
      <div class="food-ingredient">
        <h3 class='ingredients hidden' id='ingredients${currentRecipeSelection[i].id}'>${findRecipeIngredients(currentRecipeSelection[i].name)}</h3>
      </div>
      <div class="food-instructions">
        <h3 class='instructions hidden' id='instructions${currentRecipeSelection[i].id}'>${instructionText}</h3>
      </div>
      <div class="food-tags">
        <h4 class='tags hidden'>${currentRecipeSelection[i].tags}</h4>
      </div>
    </section>
  </section>
    `;

  };

  allowToggle();
};


const recipesToCookFindByName = () => {
  const input = document.getElementById('savedRecipeInput').value
  currentRecipeSelection = findRecipeName(recipeData, input)
  displayRecipes();
};

savedRecipes.addEventListener('click', savedRecipesPage)
savedRecipes2.addEventListener('click', savedRecipesPage)

searchUserRecipesBtn.addEventListener('click', recipesToCookFindByName)

const addToSavedRecipe = (recipe) => {
  if (!recipesToCook.includes(recipe)) {
    recipesToCook.push(recipe)
  }
};


// const homePageView = () => {
//   savedRecipesView.innerHTML = null;
//   recipeDisplaySection.innerHTML = null;
// };
// homeViewBtn.addEventListener('click', homePageView)

//To display a dollar
const centsToDollarAmount = (cents) => {
  return cents / 100
};

const userSignUp = () => {
  const email = emailSignUp.value;
  if(email) {
    alert('Thank you for joining the Flavor Haven Family!')
  } else {
    alert('Please enter a valid email!')
  }
}
emailSignUpBtn.addEventListener('click', userSignUp)

const allBestSelections = () =>{
console.log(recipesChosen)
  for (var i = 0; i < recipesChosen.length; i++)
  {
    var instructionText = [];
    recipesChosen[i].instructions.forEach((instructionData) => instructionText.push(`<br>` + instructionData.number + '.) ' + instructionData.instruction));
    var recipeIngredients = findRecipeIngredients(recipesChosen[i].name);
    var ingredientListForRecipe = [];
    recipeIngredients.forEach((ingredientVar) => ingredientListForRecipe.push(`<br> <span>&#8594;</span> ` +ingredientVar));
    console.log(ingredientListForRecipe)

    bestSelectionInner.innerHTML += `<div class="container-best-select-imgs-${i+1}">
        <img class="best-select-actual-img-${i+1}" src="${recipesChosen[i].image}"
          alt="${recipesChosen[i].name}"><!----NEW-->
        <div class="container-best-text-${i+1} hidden">
          <h3 class="best-title-${i+1}">${recipesChosen[i].name}</h3><!----NEW-->
          <button class='save-recipe' id='saveRecipe${recipesChosen[i].id}'>Save This Recipe!</button>
          <h3 class='total-price' id='foodPriceFeatured${i+1}'>Total price $: ${centsToDollarAmount(findRecipePrice(recipesChosen[i])).toFixed(2)}</h3>
          <h3 class='ingredients' id='ingredients${i+1}'>${ingredientListForRecipe}</h3>
            <p class='card-text instructions' id='instructions${i+1}'>${instructionText}</p>
        </div>
      </div>`
      
  }
  const bestSelectionOneBtn = document.querySelector('.best-select-actual-img-1')
  const bestSelectionTwoBtn = document.querySelector('.best-select-actual-img-2')
  const bestSelectionThreeBtn = document.querySelector('.best-select-actual-img-3')
  const bestSelectionFourBtn = document.querySelector('.best-select-actual-img-4')


  const bestSelectionSaveOne = document.querySelector(`#saveRecipe${recipesChosen[0].id}`)
  bestSelectionSaveOne.idVal = JSON.parse(JSON.stringify(recipesChosen[0].id));
  const bestSelectionSaveTwo = document.querySelector(`#saveRecipe${recipesChosen[1].id}`)
  bestSelectionSaveTwo.idVal = JSON.parse(JSON.stringify(recipesChosen[1].id));

  const bestSelectionSaveThree = document.querySelector(`#saveRecipe${recipesChosen[2].id}`)
  bestSelectionSaveThree.idVal = JSON.parse(JSON.stringify(recipesChosen[2].id));

  const bestSelectionSaveFour = document.querySelector(`#saveRecipe${recipesChosen[3].id}`)
  bestSelectionSaveFour.idVal = JSON.parse(JSON.stringify(recipesChosen[3].id));

  bestSelectionSaveOne.addEventListener('click', saveRecipe);
  bestSelectionSaveTwo.addEventListener('click', saveRecipe);
  bestSelectionSaveThree.addEventListener('click', saveRecipe);
  bestSelectionSaveFour.addEventListener('click', saveRecipe);

  bestSelectionOneBtn.addEventListener('click', bestSelectionsOne)
  bestSelectionTwoBtn.addEventListener('click', bestSelectionsTwo)
  bestSelectionThreeBtn.addEventListener('click', bestSelectionsThree)
  bestSelectionFourBtn.addEventListener('click', bestSelectionsFour)
}

function bestSelectionsOne() {
  const bestTitleOne = document.querySelector('.container-best-text-1')
  bestTitleOne.classList.toggle('hidden')
}

function bestSelectionsTwo (){
  const bestTitleTwo = document.querySelector('.container-best-text-2')
  bestTitleTwo.classList.toggle('hidden')
}

function bestSelectionsThree(){
  const bestTitleTwo = document.querySelector('.container-best-text-3')
  bestTitleTwo.classList.toggle('hidden')
}

function bestSelectionsFour() {
  const bestTitleTwo = document.querySelector('.container-best-text-4')
  bestTitleTwo.classList.toggle('hidden')
}


export {
  displayRecipes,
  userInput,
  savedRecipesPage,
  addToSavedRecipe,

  userSignUp,
  bestSelectionsOne,
  bestSelectionsTwo,
  bestSelectionsThree,
  bestSelectionsFour,

  saveRecipe

};