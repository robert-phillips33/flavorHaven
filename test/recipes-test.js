import { expect } from 'chai';
// const chai = require('chai');
// const expect = chai.expect;
import { findRecipeIngredients, findRecipeTag, findRecipeName, findRecipePrice } from '../src/recipes.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

describe('findRecipeIngredients', () => {
  it('Should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
  });
  it('should get list of names', () => {
    const response = findRecipeIngredients(recipeData[13]);
    expect(response).to.deep.equal([
      'black pepper',
      'butter',
      'flat leaf parsley leaves',
      'whole garlic clove',
      'dried red chili',
      'salt',
      'jumbo shrimp',
      'vidalia onion'])
  });
})

describe('findRecipeTag', () => {
  it.skip('Should be a function', () => {
    expect(findRecipeTag).to.be.a('function');
  });

  it('Should return a filtered list of recipes based on a tag', () => {
    const recipeTag = findRecipeTag(recipeData, 'sauce')
    expect(recipeTag).to.deep.equal('Dirty Steve\'s Original Wing Sauce')
  });
});

describe('findRecipeName', () => {
  it('Should be a function', () => {
    expect(findRecipeName).to.be.a('function');
  });
  it('should get a matching name', () => {
    const response = findRecipeName(recipeData, 'Chocolate');
    expect(response[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups')
  });
});

describe('findRecipePrice', () => {
  it('Should be a function', () => {
    expect(findRecipePrice).to.be.a('function');
  });

  it('should have the right price total', () => {
    const price = findRecipePrice(recipeData[5])
    expect(price).to.equal(18880.25);
  });
});