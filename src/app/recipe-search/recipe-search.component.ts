import { Component, OnInit } from '@angular/core';
import {UniversalisService} from "../../services/universalis.service";
import {XIVApiService} from "../../services/xivapi.service";
import {Recipe} from "../../models/recipe.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit {
  searchedForName = "Crag";
  recipes : Recipe[] = [];
  worlds : {name: string, selected: boolean}[] = [];
  selectedWorld : string = "Phoenix";

  constructor(private universalisService : UniversalisService, private xivApiService : XIVApiService, private router : Router) { }

  async ngOnInit() {
    this.worlds = await this.xivApiService.getWorlds();
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

  async onRecipeSelect(recipe : Recipe) {
    await this.router.navigate(["calculator"], { state: {recipe: recipe, world: this.selectedWorld}});
  }

  selectWorld(world : {name: string, selected: boolean}) {
    this.selectedWorld = world.name;
    for (let w of this.worlds) {
      w.selected = w.name === world.name;
    }
  }
}
