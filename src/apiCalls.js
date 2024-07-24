// Your fetch requests will live here!
let currentUser;
const userPromise = fetch("http://localhost:3001/api/v1/users").then((response) => response.json());
console.log(userPromise);
const ingredientsPromise = fetch("http://localhost:3001/api/v1/ingredients").then((response) => response.json());
const recipesPromise = fetch("http://localhost:3001/api/v1/recipes").then((response) => response.json());

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
    var responseClone;
    fetch('http://localhost:3001/data/users.js')
        .then(function (response) { responseClone = response.clone(); return response.json() })
        .then(function (data) { console.log(data) }, function (rejectionReason) { // 3
            console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
            responseClone.text() // 5
                .then(function (bodyText) {
                    console.log('Received the following instead of valid JSON:', bodyText); // 6
                }) })
        .catch (err => console.log('ERROR: ', err));
    console.log('it clicked');

}
// function postTestUser() {
//     fetch('http://localhost:3001/data/users', {
//         method: 'POST',
//         body: JSON.stringify({
//             id: 999999,
//             name: 'Z',
//             recipesToCook: []
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => response.json())
//         .then(json => console.log(json))
//         .catch(err => console.log('ERROR: ', err));
//         console.log("postTestUser executed");
// };
// function postTestUser2(currentUser) {
//     fetch('http://localhost:3001/api/v1/users', {
//         method: 'POST',
//         body: JSON.stringify({
//             userID: currentUser.id,
//             recipeID: currentUser.recipesToCook,
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => response.json())
//         .then(json => console.log(json))
//         .catch(err => console.log('ERROR: ', err));
//         console.log("postTestUser executed");
// };

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

// postTestUser();
function postTestUserRecipe() {
    fetch('http://localhost:3001/api/v1/usersRecipes', {
        method: 'POST',
        body: JSON.stringify({
            userID: 49,
            recipeID: 595736
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log('ERROR: ', err));

    fetch('http://localhost:3001/api/v1/users')
        .then(response => response.json())
        .then(data => console.log(data));
    console.log('it posted');
}


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
    // postTestUser,
    // postTestUser2,
    getUsers,

};