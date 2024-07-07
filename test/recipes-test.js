import { expect } from 'chai';
import { findRecipeIngredients, findRecipeTag, findRecipeName } from '../src/recipes';
import recipeData from '../src/data/recipes';

describe('findRecipeIngredients', () => {
  it('Should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
  });
})

describe('findRecipeTag', () => {
  it.skip('Should be a function', () => {
    expect(findRecipeTag).to.be.a('function');
  });

  it.skip('Should return a filtered list of recipes based on a tag', () => {
    const recipeTag = findRecipeTag(recipeData, 'sauce')
    expect(recipeTag).to.deep.equal('Dirty Steve\'s Original Wing Sauce')
  });
});

describe('findRecipeName', () => {
  it.skip('Should be a function', () => {
    expect(findRecipeName).to.be.a('function');
  });
});
