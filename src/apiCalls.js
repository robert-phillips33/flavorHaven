let currentUser;
let recipesChosen = [];
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

const featuredRecipes = (response) => {
    var listOfRecipes = JSON.parse(JSON.stringify(response[0]));
    console.log(listOfRecipes)
    for (var i = 0; i < 4; i++) {
        var recipeIndex = getRandomIndex(listOfRecipes.recipes)
        var recipeForArray = listOfRecipes.recipes[recipeIndex];
        recipesChosen.push(recipeForArray);
        listOfRecipes.recipes.splice(recipeIndex, 1);
    }
    console.log(recipesChosen)
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
    // var responseClone;
    fetch('http://localhost:3001/api/v1/recipes')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log('ERROR: ', err));
    console.log('it clicked');

}



function postRecipeToUser(user, recipeChoice) { // renamed from Z's test stuff.

    fetch('http://localhost:3001/api/v1/usersRecipes', {
        method: 'POST',
        body: JSON.stringify({
            userID: user.id,
            recipeID: recipeChoice.id
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
    recipesChosen,
    currentUser,
    ingredientList,
    featuredRecipes,
    getUsers,
    postRecipeToUser // What we changed to save recipes to api users
};