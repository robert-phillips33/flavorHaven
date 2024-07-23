// Your fetch requests will live here!
let currentUser;
const userPromise = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users").then((response) => response.json());
console.log(userPromise);
const ingredientsPromise = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients").then((response) => response.json());
const recipesPromise = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes").then((response) => response.json());

let userList;
let ingredientList;
let recipeData;

const randomUser = (response) => {
    userList = response[0];
    currentUser = userList.users[getRandomIndex(userList.users)];
    console.log(currentUser.name)
};

const randomRecipe = (response) => {
    recipesChosen = response[0];
    currentRecipe = recipeData.recipesChosen[getRandomIndex(recipeData.recipesChosen)];
    console.log(currentRecipe.name)
};
const getRandomIndex = (array) => {
    return Math.floor(Math.random() * array.length);
};
const handleIngredients = (response) => {
    ingredientList = response[0].ingredients;
};
const handleRecipes = (response) => {
    recipeData = response[0].recipes;
};

function getUsers() {
    fetch('http://localhost:3001/api/v1/users')
      .then(response => response.json())
      .then(data => console.log(data));
    console.log('it clicked');
  }
function postTestUser() {
    fetch('http://localhost:3001/api/v1/users', {
        method: 'POST',
        body: JSON.stringify({
            id: 999999,
            name: 'Z',
            recipesToCook: []
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log('ERROR: ', err));
        console.log("postTestUser executed");
};
function postTestUser2(currentUser) {
    fetch('http://localhost:3001/api/v1/users', {
        method: 'POST',
        body: JSON.stringify({
            userID: currentUser.id,
            recipeID: currentUser.recipesToCook,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log('ERROR: ', err));
        console.log("postTestUser executed");
};
// fetch('http://localhost:3001/api/v1/users', {
//     method: 'POST',
//     body: JSON.stringify({
//         id: 999999,
//         name: 'Z',
//         recipesToCook: []
//     }),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.log('ERROR: ', err));

postTestUser();



export {
    userPromise,
    ingredientsPromise,
    handleIngredients,
    handleRecipes,
    recipesPromise,
    recipeData,
    randomUser,
    currentUser,
    ingredientList,
    randomRecipe,
    postTestUser,
    postTestUser2,
    getUsers,

};