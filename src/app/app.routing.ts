import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeSearchComponent} from "./recipe-search/recipe-search.component";
import {CalculatorComponent} from "./calculator/calculator/calculator.component";

const routes : Routes = [
  {path: "", redirectTo: "search", pathMatch: "full"},
  {path: "search", component: RecipeSearchComponent},
  {path: "calculator", component: CalculatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {


}
