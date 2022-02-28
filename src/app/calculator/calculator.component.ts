import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RecipeModel} from "../../models/recipe.model";
import {DataTransformService} from "../../services/data-transform.service";
import {TransformedItem} from "../../models/transformed-item.model";
import {RecipeColumnComponent} from "./recipe-column/recipe-column.component";
import {colors} from "@angular/cli/utilities/color";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @ViewChild("recipe_column_0") recipeCard : any;

  private readonly recipe! : RecipeModel;
  public item : TransformedItem | null = null;
  public ingredientColumns : TransformedItem[][] = [];
  public ingredientColumnsBackup : TransformedItem[][] = [];

  constructor(private router : Router, private dataTransformService : DataTransformService) {
    const currentNavigation = this.router.getCurrentNavigation();
    // should always correctly receive data
    if (currentNavigation) {
      const state = currentNavigation.extras.state;
      if (state) {
        this.recipe = new RecipeModel(state["recipe"]);
        let selectedWorld = state["world"];
        this.dataTransformService.transformToUsableData(selectedWorld, this.recipe).then((t) => {
          this.item = t;
          this.createIngredientColumns();
        }, (e) => {
          console.log(e);
        }).catch((e) => console.log(e));
      }
    }
  }

  ngOnInit(): void {
  }

  getItemWithColAt(item : TransformedItem | null, col : number) {
    return {i: item, c: col};
  }

  createIngredientColumns() {
    if (this.item === null) return;
    this.setIngredientColumnDepth(this.item);
  }

  toggleItemFromIngredients(ingredient : {i: TransformedItem | null, c: number}) {
    if (ingredient.i === null) return;
    // console.log("c: ", ingredient.c, " l: ", this.ingredientColumns.length);

    // toggle the use of crafted price
    ingredient.i.setUseCraftedPrice(!ingredient.i.getUseCraftedPrice());

    let col = this.ingredientColumns[ingredient.c];
    if (col.includes(ingredient.i)) {
      // console.log(col.includes(ingredient.i), "removing from: ", ingredient.c);
      let colToRemoveFrom = this.ingredientColumns[ingredient.c];
      colToRemoveFrom.forEach((val, index) => {
        if (val == ingredient.i) {
          colToRemoveFrom.splice(index, 1);
        }
      });
    }
    else {
      col.push(ingredient.i);
    }
  }

  getTotalProfit() : number {
    if (this.item && this.recipeCard) {
      return this.item.getSetPrice() - this.getCraftingPrice();
    }
    return 0;
  }

  private setIngredientColumnDepth(item : TransformedItem) {
    const depth = this.getMaxIngredientColumnDepth(item);
    for (let i = 0; i < depth; i++) {
      this.ingredientColumns.push([]);
      this.ingredientColumnsBackup.push([]);
    }
  }

  private getMaxIngredientColumnDepth(item : TransformedItem, lastDepth : number = 0) : number {
    let found = false;
   for (let i of item.getIngredients()) {
     if (i.isCraftedItem() && !found) {
       found = true;
       lastDepth = this.getMaxIngredientColumnDepth(i, lastDepth) + 1;
     }
   }
    return lastDepth;
  }

  private getCraftingPrice() : number {
    if (this.item) {
      let total = 0;
      this.item.getIngredients().forEach((i) => {
        total += (i.getSetPrice() * i.getAmount());
      });
      return total;
    }
    return 0;
  }
}
