import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemReturnValue} from "../../../services/xivapi.service";
import {Item} from "../../../models/item.interface";
import {Recipe} from "../../../models/recipe.interface";

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit {
  @Input() recipe! : Recipe;
  @Output() onClick = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  getRecipeIconUrl() : string {
    return "https://xivapi.com" + this.recipe.Icon;
  }
}
