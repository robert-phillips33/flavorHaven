import { expect } from 'chai';
// const chai = require('chai');
// const expect = chai.expect;
import { findRecipeIngredients, findRecipeTag, findRecipeName, findRecipePrice, findRecipeInstructions } from '../src/recipes.js';
// import { ingredientsPromise, ingredientList, handleIngredients, handleRecipes,  recipesPromise } from '../src/apiCalls.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';
import newRecipeData from '../src/data/recipesSample.js';

describe('findRecipeIngredients', () => {
  it('Should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
  });
  it('should get list of names', () => {
    const myRecipeIngredient = findRecipeIngredients(newRecipeData[1].name);
    // console.log(newRecipeData[1].ingredients)
    expect(myRecipeIngredient).to.deep.equal([
      'apple cider',
      'apple',
      'corn starch',
      'dijon style mustard',
      'whole garlic clove',
      'whole grain dijon mustard',
      'maple',
      'miso',
      'pork chop',
      's&p',
      'soy sauce',
      'sriracha sauce'])
  });
})

describe('findRecipeTag', () => {
  it('Should be a function', () => {
    expect(findRecipeTag).to.be.a('function');
  });

  it('Should return a filtered list of recipes based on a tag', () => {
    const recipeTag = findRecipeTag(recipeData, 'sauce')
    expect(recipeTag).to.deep.equal(['Dirty Steve\'s Original Wing Sauce'])
  });
});


describe('findRecipeName', () => {
  it('Should be a function', () => {
    expect(findRecipeName).to.be.a('function');
  });
  it('should get a matching name', () => {
    const recipeName = findRecipeName(recipeData, 'Chocolate');
    expect(recipeName[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups')
  });
});

describe('findRecipePrice', () => {
  it('Should be a function', () => {
    expect(findRecipePrice).to.be.a('function');
  });

  it('should have the right price total', () => {
    const recipePrice = findRecipePrice(recipeData[5])
    expect(recipePrice).to.equal(18880.25);
  });
});

describe('findRecipeInstructions', function() {
  it('should be a function', function() {
    expect(findRecipeInstructions).to.be.a('function');
  });

  it('should return the instructions for a given recipe', function() {
    const userRecipe = findRecipeInstructions(recipeData, 'Pastry Cream')
    expect(userRecipe).to.deep.equal([
      {
        instruction: 'In a heavy saucepan, stir together the milk and 1/4 cup of sugar. Bring to a boil over medium heat.',
        number: 1
      },
      {
        instruction: "In a medium bowl, whisk together the egg yolks and egg. Stir together the remaining sugar and cornstarch; then stir them into the egg until smooth. When the milk comes to a boil, drizzle it into the bowl in a thin stream while mixing so that you do not cook the eggs. Return the mixture to the saucepan, and slowly bring to a boil, stirring constantly so the eggs don' t curdle or scorch on the bottom.",
        number: 2
      },
      {
        instruction: 'When the mixture comes to a boil and thickens, remove from the heat. Stir in the butter and vanilla, mixing until the butter is completely blended in.',
        number: 3
      },
      {
        instruction: 'Pour into a heat-proof container and place a piece of plastic wrap directly on the surface to prevent a skin from forming. Refrigerate until chilled before using.',
        number: 4
      }
    ])
  });
});