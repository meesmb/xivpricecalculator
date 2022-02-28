import {Recipe} from "./recipe.interface";
import {Item} from "./item.interface";

export class RecipeModel {
  constructor(private recipe : Recipe) {
  }

  getIngredients() : {ingredient: Item, amount: number}[] {
    // i know this is not great :(
    let ingredients : {ingredient: Item, amount: number}[] = [];
    if (this.recipe.ItemIngredient0)
      ingredients.push({ingredient: this.recipe.ItemIngredient0, amount: this.recipe.AmountIngredient0});
    if (this.recipe.ItemIngredient1)
      ingredients.push({ingredient: this.recipe.ItemIngredient1, amount: this.recipe.AmountIngredient1});
    if (this.recipe.ItemIngredient2)
      ingredients.push({ingredient: this.recipe.ItemIngredient2, amount: this.recipe.AmountIngredient2});
    if (this.recipe.ItemIngredient3)
      ingredients.push({ingredient: this.recipe.ItemIngredient3, amount: this.recipe.AmountIngredient3});
    if (this.recipe.ItemIngredient4)
      ingredients.push({ingredient: this.recipe.ItemIngredient4, amount: this.recipe.AmountIngredient4});
    if (this.recipe.ItemIngredient5)
      ingredients.push({ingredient: this.recipe.ItemIngredient5, amount: this.recipe.AmountIngredient5});
    if (this.recipe.ItemIngredient6)
      ingredients.push({ingredient: this.recipe.ItemIngredient6, amount: this.recipe.AmountIngredient6});
    if (this.recipe.ItemIngredient7)
      ingredients.push({ingredient: this.recipe.ItemIngredient7, amount: this.recipe.AmountIngredient7});
    if (this.recipe.ItemIngredient8)
      ingredients.push({ingredient: this.recipe.ItemIngredient8, amount: this.recipe.AmountIngredient8});
    if (this.recipe.ItemIngredient9)
      ingredients.push({ingredient: this.recipe.ItemIngredient9, amount: this.recipe.AmountIngredient9});
    return ingredients;
  }

  getIngredientRecipes() : {recipes: Recipe[]}[] {
    let recipes : {recipes: Recipe[]}[] = [];
    if (this.recipe.ItemIngredientRecipe0)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe0});
    if (this.recipe.ItemIngredientRecipe1)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe1});
    if (this.recipe.ItemIngredientRecipe2)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe2});
    if (this.recipe.ItemIngredientRecipe3)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe3});
    if (this.recipe.ItemIngredientRecipe4)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe4});
    if (this.recipe.ItemIngredientRecipe5)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe5});
    if (this.recipe.ItemIngredientRecipe6)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe6});
    if (this.recipe.ItemIngredientRecipe7)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe7});
    if (this.recipe.ItemIngredientRecipe8)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe8});
    if (this.recipe.ItemIngredientRecipe9)
      recipes.push({recipes: this.recipe.ItemIngredientRecipe9});
    return recipes;
  }

  getName() : string {
    return this.recipe.Name;
  }
  getUrl() : string {
    return this.recipe.Url;
  }
  getId() : string {
    return this.recipe.Id;
  }
  getIcon() : string {
    return this.recipe.Icon;
  }
  getRecipe() : Recipe {
    return this.recipe;
  }
}
