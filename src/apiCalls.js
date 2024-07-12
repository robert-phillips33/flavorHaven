// Your fetch requests will live here!
let currentUser;
const userPromise =fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users").then((response)=> response.json());
console.log(userPromise);
const ingredientsPromise =fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients").then((response)=> response.json());
const recipesPromise =fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes").then((response)=> response.json());

let userList;


const randomUser = (response) => {
    userList = response[0];
    currentUser = userList.users[getRandomIndex(userList.users)];
    console.log(currentUser.name)
}
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}


export {
    userPromise,
    ingredientsPromise,
    recipesPromise,
    randomUser,
    currentUser,
}