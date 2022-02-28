import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RecipeModel} from "../../../models/recipe.model";
import {UniversalisService} from "../../../services/universalis.service";
import {DataTransformService} from "../../../services/data-transform.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  private readonly recipe! : RecipeModel;

  constructor(private router : Router, private dataTransformService : DataTransformService) {
    const currentNavigation = this.router.getCurrentNavigation();
    // should always correctly receive data
    if (currentNavigation) {
      const state = currentNavigation.extras.state;
      if (state) {
        this.recipe = new RecipeModel(state["recipe"]);
        this.dataTransformService.transformToUsableData("Phoenix", this.recipe).then((r) => {
        }, (e) => {
        }).catch((e) => console.log(e));
      }
    }
  }

  ngOnInit(): void {
  }
}
