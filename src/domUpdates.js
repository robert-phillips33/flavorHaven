
import { userPromise, currentUser, userList, ingredientList, recipesChosen, removeRecipeForUser, featuredRecipes, randomUser, recipeData, recipesPromise, ingredientsPromise, postTestUser, postRecipeToUser } from './apiCalls.js';
import { findRecipeIngredients, findRecipeTag, findRecipeName, findRecipePrice } from '../src/recipes.js';
import { result } from 'lodash';

const allRecipesButton = document.querySelector('.allRecipes');
const recipeDisplaySection = document.querySelector('.recipe-list-display');
const searchUserRecipes = document.querySelector('#savedRecipeInput');
const aboutUs = document.querySelector('.aboutUs-btn');
const logIn = document.querySelector('.logged-in-as');
const searchRecipes = document.querySelector('#searchInput');
const searchUserRecipesBtn = document.querySelector('#user-recipe-search-button');
const savedRecipesView = document.querySelector('.saved-recipes');
const searchRecipesBtn = document.querySelector('#quick-search-button');
const savedRecipes = document.querySelector('.user-recipes-button');
const savedRecipes2 = document.querySelector('.user-recipes-button2');
const userSearchDisplay = document.querySelector('.best-selection');
const emailSignUp = document.querySelector('#email-input');
const emailSignUpBtn = document.querySelector('#email-button');
const bestSelectionName = document.querySelector('.best-select-name');
const bestSelectionNameTwo = document.querySelector('.best-select-name-2');
const bestSelectionNameThree = document.querySelector('.best-select-name-3');
const bestSelectionNameFour = document.querySelector('.best-select-name-4');
const aboutUsView = document.querySelector('.about-us');
const bestSelectionInner = document.querySelector('.best-selection-inner');
var addItemButton = document.querySelector('.aboutUs-btn');
var addItemButton2 = document.querySelector('.aboutUs-btn2');
const dropDownContentView = document.querySelector('dropDownBtn');
let recipesToCook = [];

var currentRecipeSelection = recipeData;
Promise.all([userPromise]).then((values) => { randomUser(values) }).catch(err => console.log('ERROR: could not get user data. log: ', err));
;
Promise.all([recipesPromise]).then((values) => { featuredRecipes(values) }).then((values) => { allBestSelections() }).catch(err => console.log('ERROR: could not get featured recipes. log: ', err));
;

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

Promise.all([userPromise]).then((values) => { handleData(values) }).catch(err => console.log('ERROR: Could not log in correctly. log: ', err));

const handleData = (response) => {
  logIn.innerHTML = currentUser.name;
};

const displayRecipes = () => {
  
  savedRecipesView.innerHTML = null;
  recipeDisplaySection.innerHTML = null;
  var detailedRecipeArray = [];
  for (var i = 0; i < currentRecipeSelection.length; i++) {
    var instructionText = [];

    currentRecipeSelection[i].instructions.forEach((instructionData) => instructionText.push(`<br>` + instructionData.number + '.) ' + instructionData.instruction));
    var recipeIngredients = findRecipeIngredients(currentRecipeSelection[i].name);
    var ingredientListForRecipe = [];
    recipeIngredients.forEach((ingredientVar) => ingredientListForRecipe.push(`<br> <span>&#8594;</span> ` + ingredientVar));

    recipeDisplaySection.innerHTML += `
    <section class="card mb-2 single-food">
        <div class="click-box" id='ID${currentRecipeSelection[i].id}'>
          <img role="button" class='card-img-top food-image' id='foodImage${currentRecipeSelection[i].id}' src='${currentRecipeSelection[i].image}' alt='Food Image' tabindex="0" aria-expanded="false">
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

  var recipeToSave = recipeData.find((recipe) => recipe.id === valForID);
  if (currentUser.recipesToCook.includes(recipeToSave.id)) {
    currentUser.recipesToCook.splice(currentUser.recipesToCook.indexOf(recipeToSave.id), 1);
    removeRecipeForUser(currentUser, recipeToSave)
  }
  else {
    currentUser.recipesToCook.push(recipeToSave.id);
    postRecipeToUser(currentUser, recipeToSave);
  }
};

allRecipesButton.addEventListener('click', allRecipesVis);
function allRecipesVis() {
  currentRecipeSelection = recipeData;
  displayRecipes();
};

var arrayOfRecipeImages = [];
var arrayOfRecipeButtons = [];

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

const userInput = () => {
  const input = document.getElementById('searchInput').value;
  currentRecipeSelection = findRecipeName(recipeData, input);
  if (currentRecipeSelection.length === 0) {
    alert('(⊙︿⊙) None of our recipes match your input (⊙︿⊙)')
  };                                                          

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
  var detailedRecipeArray = [];
  currentRecipeSelection.forEach((idVal) => detailedRecipeArray.push(recipeData.find((recipeVal) => recipeVal.id === idVal)));
  currentRecipeSelection = detailedRecipeArray;
  for (var i = 0; i < currentRecipeSelection.length; i++) {

    var instructionText = [];

    detailedRecipeArray[i].instructions.forEach((instructionData) => instructionText.push(`<br>` + instructionData.number + '.) ' + instructionData.instruction));

    savedRecipesView.innerHTML += `
  <section class="single-food">
    <section class="click-box" id='ID${detailedRecipeArray[i].id}'>
      <div class="food-image-container">
        <img class='food-image' id='foodImage${detailedRecipeArray[i].id}' src='${detailedRecipeArray[i].image}' alt='${detailedRecipeArray[i].name}'>
      </div>
      <div class="food-details">
        <h2 class='food-name' id='foodName${detailedRecipeArray[i].id}'>${detailedRecipeArray[i].name}</h2>
        <button class='save-recipe hidden' id='saveRecipe${detailedRecipeArray[i].id}'>Unsave This Recipe!</button>
        <h3 class='total-price hidden' id='foodPrice${detailedRecipeArray[i].id}'>Total price $: ${centsToDollarAmount(findRecipePrice(detailedRecipeArray[i])).toFixed(2)}</h3>
      </div>
      <div class="food-ingredient">
        <h3 class='ingredients hidden' id='ingredients${detailedRecipeArray[i].id}'>${findRecipeIngredients(detailedRecipeArray[i].name)}</h3>
      </div>
      <div class="food-instructions">
        <h3 class='instructions hidden' id='instructions${detailedRecipeArray[i].id}'>${instructionText}</h3>
      </div>
      <div class="food-tags">
        <h4 class='tags hidden'>${detailedRecipeArray[i].tags}</h4>
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
  if (!recipesToCook.includes(recipe.id)) {
    recipesToCook.push(recipe.id)
  }
};


const centsToDollarAmount = (cents) => {
  return cents / 100
};

const userSignUp = () => {
  const email = emailSignUp.value;
  if (email) {
    alert('Thank you for joining the Flavor Haven Family!')
  } else {
    alert('Please enter a valid email!')
  }
};
emailSignUpBtn.addEventListener('click', userSignUp)

const allBestSelections = () => {
  for (var i = 0; i < recipesChosen.length; i++) {

    var instructionText = [];

    recipesChosen[i].instructions.forEach((instructionData) => instructionText.push(`<br>` + instructionData.number + '.) ' + instructionData.instruction));
    var recipeIngredients = findRecipeIngredients(recipesChosen[i].name);
    var ingredientListForRecipe = [];
    recipeIngredients.forEach((ingredientVar) => ingredientListForRecipe.push(`<br> <span>&#8594;</span> ` + ingredientVar));

    bestSelectionInner.innerHTML += `<div class="container-best-select-imgs-${i + 1}">
        <img class="best-select-actual-img-${i + 1}" src="${recipesChosen[i].image}"
          alt="${recipesChosen[i].name}" tabindex="0"><!----NEW-->
        <div class="container-best-text-${i + 1} hidden">
          <h3 class="best-title-${i + 1}">${recipesChosen[i].name}</h3><!----NEW-->
          <button class='save-recipe' id='saveRecipe${recipesChosen[i].id}'>Save This Recipe!</button>
          <h3 class='total-price' id='foodPriceFeatured${i + 1}'>Total price $: ${centsToDollarAmount(findRecipePrice(recipesChosen[i])).toFixed(2)}</h3>
          <h3 class='ingredients' id='ingredients${i + 1}'>${ingredientListForRecipe}</h3>
            <p class='card-text instructions' id='instructions${i + 1}'>${instructionText}</p>
        </div>
      </div>`
  };

  const bestSelectionOneBtn = document.querySelector('.best-select-actual-img-1');
  const bestSelectionTwoBtn = document.querySelector('.best-select-actual-img-2');
  const bestSelectionThreeBtn = document.querySelector('.best-select-actual-img-3');
  const bestSelectionFourBtn = document.querySelector('.best-select-actual-img-4');
  const bestSelectionSaveOne = document.querySelector(`#saveRecipe${recipesChosen[0].id}`);

  bestSelectionSaveOne.idVal = JSON.parse(JSON.stringify(recipesChosen[0].id));
  const bestSelectionSaveTwo = document.querySelector(`#saveRecipe${recipesChosen[1].id}`);
  bestSelectionSaveTwo.idVal = JSON.parse(JSON.stringify(recipesChosen[1].id));
  const bestSelectionSaveThree = document.querySelector(`#saveRecipe${recipesChosen[2].id}`);
  bestSelectionSaveThree.idVal = JSON.parse(JSON.stringify(recipesChosen[2].id));
  const bestSelectionSaveFour = document.querySelector(`#saveRecipe${recipesChosen[3].id}`);
  bestSelectionSaveFour.idVal = JSON.parse(JSON.stringify(recipesChosen[3].id));

  bestSelectionSaveOne.addEventListener('click', saveRecipe);
  bestSelectionSaveTwo.addEventListener('click', saveRecipe);
  bestSelectionSaveThree.addEventListener('click', saveRecipe);
  bestSelectionSaveFour.addEventListener('click', saveRecipe);
  bestSelectionOneBtn.addEventListener('click', bestSelectionsOne);
  bestSelectionTwoBtn.addEventListener('click', bestSelectionsTwo);
  bestSelectionThreeBtn.addEventListener('click', bestSelectionsThree);
  bestSelectionFourBtn.addEventListener('click', bestSelectionsFour);
};

function bestSelectionsOne() {
  const bestTitleOne = document.querySelector('.container-best-text-1');
  bestTitleOne.classList.toggle('hidden');
};

function bestSelectionsTwo() {
  const bestTitleTwo = document.querySelector('.container-best-text-2');
  bestTitleTwo.classList.toggle('hidden');
};

function bestSelectionsThree() {
  const bestTitleTwo = document.querySelector('.container-best-text-3');
  bestTitleTwo.classList.toggle('hidden');
};

function bestSelectionsFour() {
  const bestTitleTwo = document.querySelector('.container-best-text-4');
  bestTitleTwo.classList.toggle('hidden');
};

/*
**********************************************
*>>>>>>>>> BEGIN ACCESSIBILITY CODE <<<<<<<<<*
**********************************************
*/

const blogPostContainers = document.querySelectorAll('.food-blog-container');
const dropDownContent = document.querySelectorAll('.dropdown-content');
const dropArrow = document.querySelectorAll('.for-dropdown');

window.addEventListener('keydown', event => {
  if (event.keyCode === 32) {
    event.preventDefault();
  };
});

function openDropDown(event) {

  function getDropdown() {
    let allRecipesButton = event.target.parentElement.classList.contains('all-recipes-button');
    let userRecipesButton = event.target.parentElement.classList.contains('user-recipes-button');

    if (event.keyCode === 13 && allRecipesButton === true) {
      return dropDownContent[0];
    } else if (event.keyCode === 13 && userRecipesButton === true) {
      return dropDownContent[1];
    };

    if (event.keyCode === 32 && allRecipesButton === true) {
      return dropDownContent[0];
    } else if (event.keyCode === 32 && userRecipesButton === true) {
      return dropDownContent[1];
    };
  };

  let tgtDropdown = getDropdown()

  if (event.keyCode === 13 && event.shiftKey === false && !tgtDropdown.classList.contains('open')) {
    tgtDropdown.classList.add('open');
  } else if (event.keyCode === 32 && event.shiftKey === false && !tgtDropdown.classList.contains('open')) {
    tgtDropdown.classList.add('open');
  };
};

function closeDropDown() {

  function getDropdown() {
    let allRecipesButton = event.target.parentElement.classList.contains('all-recipes-button');
    let userRecipesButton = event.target.parentElement.classList.contains('user-recipes-button');

    if (event.keyCode === 13 && allRecipesButton === true) {
      return dropDownContent[0];
    } else if (event.keyCode === 13 && userRecipesButton === true) {
      return dropDownContent[1];
    };

    if (event.keyCode === 32 && allRecipesButton === true) {
      return dropDownContent[0];
    } else if (event.keyCode === 32 && userRecipesButton === true) {
      return dropDownContent[1];
    };
  };

  let tgtDropdown = getDropdown()

  if (event.keyCode === 13 && event.shiftKey === true && tgtDropdown.classList.contains('open')) {
    tgtDropdown.classList.remove('open');
  } else if (event.keyCode === 32 && event.shiftKey === true && tgtDropdown.classList.contains('open')) {
    event.preventDefault();
    tgtDropdown.classList.remove('open');
  };
};

dropArrow.forEach((arrow) => {
  arrow.addEventListener('keydown', openDropDown);
  arrow.addEventListener('keyup', closeDropDown);
});

recipeDisplaySection.addEventListener('keyup', (event) => {
  let imgClass = document.querySelector('.food-image');
  if (event.keyCode === 13 && event.target === imgClass) {
    allowToggle();
  };
});

bestSelectionInner.addEventListener('keyup', (event) => {
  let bestSelectImage1 = document.querySelector('.best-select-actual-img-1');
  let bestSelectImage2 = document.querySelector('.best-select-actual-img-2');
  let bestSelectImage3 = document.querySelector('.best-select-actual-img-3');
  let bestSelectImage4 = document.querySelector('.best-select-actual-img-4');
  if (event.keyCode === 13 || event.keyCode === 32 && bestSelectImage1 === event.target) {
    return bestSelectionsOne();
  } else if (event.keyCode === 13 || event.keyCode === 32 && bestSelectImage2 === event.target) {
    return bestSelectionsTwo();
  } else if (event.keyCode === 13 || event.keyCode === 32 && bestSelectImage3 === event.target) {
    return bestSelectionsThree();
  } else if (event.keyCode === 13 || event.keyCode === 32 && bestSelectImage4 === event.target) {
    return bestSelectionsFour();
  };
});

blogPostContainers.forEach((container) => {
  container.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      return alertForBlogPosts();
    };
  }
  )
});

/*
*********************************************************
*>>>>>>>>> ALERT FUNCTIONS FOR CLICKABLE ITEMS <<<<<<<<<*
*********************************************************
*/

function alertForBlogPosts() {
  alert('This would be a blog post about some delicious food!!');
};

/*
**********************************************
*>>>>>>>>> END ACCESSIBILITY CODE <<<<<<<<<*
**********************************************
*/


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