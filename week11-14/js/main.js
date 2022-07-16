import RecipesController from "./controllers/AppController.js";
import { toggleRecipeListSmall, toggleRecipeList } from "./utils/utilities.js";

let searchBtn = document.getElementById("search");
let savedBtn = document.getElementById("reading-list-btn");

window.addEventListener("load", () => {
  const Recipe = new RecipesController(".results");
  Recipe.init();
  toggleRecipeListSmall();
  searchBtn.addEventListener("click", () => {
    Recipe.searchRecipes();
  });
});

savedBtn.addEventListener("click", toggleRecipeList);
window.addEventListener("resize", toggleRecipeListSmall);
