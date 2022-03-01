import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RecipeModel} from "../../models/recipe.model";
import {DataTransformService} from "../../services/data-transform.service";
import {TransformedItem} from "../../models/transformed-item.model";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @ViewChild("recipe_column_0") recipeCard : any;

  private recipe! : RecipeModel;
  public item : TransformedItem | null = null;
  public ingredientColumns : TransformedItem[][] = [];
  public totalProfit = 0;

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
    this.totalProfit = this.getTotalProfit();
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
    // toggle the use of crafted price
    ingredient.i.setUseCraftedPrice(!ingredient.i.getUseCraftedPrice());
    let col = this.ingredientColumns[ingredient.c];
    if (col.includes(ingredient.i)) {
      this.removeIngredientFromColumns(ingredient);
    }
    else {
      col.push(ingredient.i);
    }
  }

  private removeIngredientFromColumns(ingredient : {i: TransformedItem | null, c: number}) {
    this.removeIngredientFromColumn(ingredient.i, ingredient.c);
    if (!ingredient.i) return;
    for (let ingr of ingredient.i.getIngredients()) {
      this.removeIngredientFromColumns({i: ingr, c: ingredient.c + 1});
    }
  }
  private removeIngredientFromColumn(i : TransformedItem | null, column : number) {
    let colToRemoveFrom = this.ingredientColumns[column];
    if (!colToRemoveFrom) return;
    colToRemoveFrom.forEach((val, index) => {
      if (val == i) {
        colToRemoveFrom.splice(index, 1);
      }
    });
  }

  private getTotalProfit() : number {
    if (this.item && this.recipeCard) {
      return this.item.getSetPrice() - this.getCraftingPrice();
    }
    return 0;
  }

  private setIngredientColumnDepth(item : TransformedItem) {
    const depth = this.getMaxIngredientColumnDepth(item) - 1;
    for (let i = 0; i < depth; i++) {
      this.ingredientColumns.push([]);
    }
  }

  private getMaxIngredientColumnDepth(item : TransformedItem) : number {
    if (!item.isCraftedItem()) return 0;
    else {
      let maxDepth = 0;
      for (let it of item.getIngredients()) {
        maxDepth = Math.max(maxDepth, this.getMaxIngredientColumnDepth(it));
      }
      return maxDepth + 1;
    }
    // for (let i of item.getIngredients()) {
    //  if (i.isCraftedItem()) {
    //    let newDepth = this.getMaxIngredientColumnDepth(i, lastDepth) + 1;
    //    if (newDepth > lastDepth)
    //      lastDepth = newDepth;
    //  }
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
