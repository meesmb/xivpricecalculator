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
  @ViewChild("recipe_column_0") recipeColumn : any;

  private readonly recipe! : RecipeModel;
  public item : TransformedItem | null = null;
  public ingredientColumns : TransformedItem[][] = [];

  constructor(private router : Router, private dataTransformService : DataTransformService) {
    const currentNavigation = this.router.getCurrentNavigation();
    // should always correctly receive data
    if (currentNavigation) {
      const state = currentNavigation.extras.state;
      if (state) {
        this.recipe = new RecipeModel(state["recipe"]);
        this.dataTransformService.transformToUsableData("Phoenix", this.recipe).then((t) => {
          this.item = t;
          this.recipeColumn.init(t);
        }, (e) => {
        }).catch((e) => console.log(e));
      }
    }
  }

  ngOnInit(): void {
  }

  toggleItemFromIngedients(column: number, ingredient : TransformedItem) {
    if (this.ingredientColumns.length <= column) {
      this.ingredientColumns.push([]);
    }
    let col = this.ingredientColumns[column];
    if (col.includes(ingredient)) {
      col.forEach((val, index) => {
        if (val == ingredient) {
          col.splice(index, 1);
        }
      });
      if (col.length === 0) {
        this.ingredientColumns.splice(column, 1);
      }
    }
    else {
      col.push(ingredient);
    }
  }

}
