import { getJSON } from "../utils/utilities.js";

export default class Recipes {
  constructor() {
    this.input = document.getElementById("user-query").value;
    this.savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    this.app_id = "d8e4207b";
    this.baseUrl = `https://api.edamam.com/api/recipes/v2`;
    this.app_key = "b9e4f1bfe2428fe5fabb2c4630956274";
    this.type = "public";
  }

  async searchRecipes() {
    let form = document.getElementById("searchForm");
    function handleForm(event) {
      event.preventDefault();
    }
    form.addEventListener("submit", handleForm);
    const dietSel = dietType();
    const cuisineSel = cuisineType();

    const input = document.getElementById("user-query").value;
    if (input === "") {
      window.alert("Ops! Your search was empty, please try again.");
    }
    const searchQuery =
      this.baseUrl +
      `?type=${this.type}&q=${input}&app_id=${this.app_id}&app_key=${this.app_key}${dietSel}${cuisineSel}`;
    this.recipeSearch = await getJSON(searchQuery);
    return this.recipeSearch;
  }

  async saveRecipe(item, location) {
    this.savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const newRecipe = {
      id: item.id,
      content: item.innerHTML,
    };
    this.savedRecipes.push(newRecipe);
    localStorage.setItem(location, JSON.stringify(this.savedRecipes));
  }

  async deleteRecipe(item, location) {
    this.savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    let recipe = item;
    let idToRemove = recipe.getAttribute("id");
    let newSavedRecipes = this.savedRecipes.filter(
      (recipes) => recipes.id != idToRemove
    );
    localStorage.setItem(location, JSON.stringify(newSavedRecipes));
  }
}

function dietType() {
  let dietSelection = document.getElementById("diet").value;
  let finalDiet = "";
  if (dietSelection === "") {
    finalDiet = "";
  } else {
    finalDiet = "&diet=" + dietSelection;
  }
  return finalDiet;
}
function cuisineType() {
  let cuisineSelection = document.getElementById("cuisineType").value;
  let finalCuisine = "";
  if (cuisineSelection === "") {
    finalCuisine = "";
  } else {
    finalCuisine = "&cuisineType=" + cuisineSelection;
  }
  return finalCuisine;
}
