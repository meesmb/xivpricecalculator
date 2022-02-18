import { Component, OnInit } from '@angular/core';
import {UniversalisService} from "../../services/universalis.service";
import {ItemReturnValue, XIVApiService} from "../../services/xivapi.service";
import {Item} from "../../models/item.model";
import {Recipe} from "../../models/recipe.interface";

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit {
  searchedForName = "Bronze Ingot";
  recipes : Recipe[] = [];

  constructor(private universalisService : UniversalisService, private xivApiService : XIVApiService) { }

  ngOnInit(): void {
  }

  setSearch(event : any) {
    this.searchedForName = event.target.value;
  }

  async search() {
    if (this.searchedForName !== "") {
      const data = await this.xivApiService.getRecipeUrlsByName(this.searchedForName);
      this.recipes = await this.xivApiService.getItemsData(data);
    }
  }

  onRecipeSelect(recipe : Recipe) {
    console.log(recipe);
  }
}
