import { Component, OnInit } from '@angular/core';
import {UniversalisService} from "../../services/universalis.service";
import {XIVApiService} from "../../services/xivapi.service";
import {Recipe} from "../../models/recipe.interface";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit {
  searchedForName = "";
  recipes : Recipe[] = [];
  worlds : {name: string, selected: boolean}[] = [];
  selectedWorld : string = "Phoenix";
  hasSearched = false;

  constructor(private universalisService : UniversalisService, private xivApiService : XIVApiService, private router : Router, private cookieService : CookieService) { }

  async ngOnInit() {
    this.hasSearched = false;
    this.worlds = await this.xivApiService.getWorlds();
    let world = this.cookieService.get("world");
    if (world)
      this.selectWorld({name: world, selected: true});
    let item = this.cookieService.get("last-searched-item");
    if (item) {
      this.searchedForName = item;
    }
  }

  setSearch(event : any) {
    this.searchedForName = event.target.value;
  }

  async search() {
    this.hasSearched = true;
    if (this.searchedForName !== "") {
      this.cookieService.set("last-searched-item", this.searchedForName);
      const data = await this.xivApiService.getRecipeUrlsByName(this.searchedForName);
      this.recipes = await this.xivApiService.getItemsData(data);
    }
  }

  async onRecipeSelect(recipe : Recipe) {
    await this.router.navigate(["calculator"], { state: {recipe: recipe, world: this.selectedWorld}});
  }

  selectWorld(world : {name: string, selected: boolean}) {
    this.cookieService.set("world", world.name);
    this.selectedWorld = world.name;
    for (let w of this.worlds) {
      w.selected = w.name === world.name;
    }
  }
}
