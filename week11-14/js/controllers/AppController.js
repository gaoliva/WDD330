import Recipes from "../models/AppModel.js";
import RecipesView from "../views/AppView.js";

export default class RecipesController {
  constructor(parent) {
    this.parent = parent;
    this.recipes = new Recipes();
    this.recipesView = new RecipesView();
  }

  async init() {
    this.recipesView.rendersavedRecipeList();
    this.addDeleteListener(".deleteBtn");
    this.addSaveListener(".saveBtn");
    this.addViewMore(".viewMore");
  }

  async searchRecipes() {
    this.parentElement = document.querySelector(this.parent);
    this.parentElement.innerHTML = '<div class="loader"></div>';
    const recipeSearch = await this.recipes.searchRecipes();
    this.parentElement.innerHTML = "";
    this.recipesView.renderRecipeList(recipeSearch, this.parentElement);
    this.init();
  }

  async addSaveListener(q) {
    const buttons = document.querySelectorAll(q);
    buttons.forEach((button) => {
      button.onclick = (e) => {
        this.recipes.saveRecipe(
          button.parentElement.parentElement,
          "savedRecipes"
        );
        this.init();
        button.classList.add("clickedBtn");
      };
    });
  }

  async addDeleteListener(q) {
    const buttons = document.querySelectorAll(q);
    buttons.forEach((button) => {
      button.onclick = (e) => {
        this.recipes.deleteRecipe(
          button.parentElement.parentElement,
          "savedRecipes"
        );
        this.init();
      };
    });
  }

  async addViewMore(q) {
    const views = document.querySelectorAll(q);
    views.forEach((view) => {
      view.onclick = (e) => {
        view.nextElementSibling.classList.toggle("hidden");
        if (view.innerHTML == "Hide Description") {
          view.innerHTML = "Show Description";
        } else {
          view.innerHTML = "Hide Description";
        }
      };
    });
  }
}
