export default class RecipesView {
  renderRecipeList(recipeList, resultsElement) {
    recipeList.hits.forEach((hit) => {
      checkProperties(hit);
      recipeCard(hit, resultsElement);
    });
  }

  rendersavedRecipeList() {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const recipeList = document.getElementById("saved");
    recipeList.innerHTML = "";
    savedRecipes.forEach((recipe) => {
      const recipes = `<div class="saved book-card" id="${recipe.id}">${recipe.content}</div>`;
      recipeList.insertAdjacentHTML("afterbegin", recipes);
      editSavedCards(recipeList);
    });
  }
}

function checkProperties(hit) {
  if (!("image" in hit.recipe)) {
    hit.recipe.image = "";
  }
  if (!("label" in hit)) {
    hit.label = "No recipe name";
  }
}

function recipeCard(hit, resultsElement) {
  const recipes = `
        <div class="book-card" id="bookcard-${hit.recipe.uri}">
          <img src="${hit.recipe.images.THUMBNAIL.url}" alt="cover of ${hit.recipe.label}">  
          <div class="title-save">
            <h2><a href="${hit.recipe.url}" target="_blank" rel="noopener">${hit.recipe.label}</a></h2> 
            <button class="saveBtn" id="${hit.recipe.uri}" aria-label="save-button"><i class="fa fa-save"></i></button>
          </div>
         
          <p class="author"><b>Source:</b> ${hit.recipe.source}</p>
          <p class="category"><b>Cousine:</b> ${hit.recipe.cuisineType}</p>
          <p class="idNumber"><b>Calories:</b> ${hit.recipe.calories}</p>
        
          <div class="viewMore">
            More information
          </div>
          <p class="description hidden"> 
            <b>Dish type: </b>${hit.recipe.dishType} <br>
            <b>Diet Type: </b>${hit.recipe.dietLabels}  <br>
            <b>Meal Type: </b>${hit.recipe.mealType} <br> 
            <b>Health Type: </b> ${hit.recipe.healthLabels} 
            </p>
        </div>
      `;
  resultsElement.insertAdjacentHTML("beforeend", recipes);
}

function editSavedCards(recipeList) {
  let savedIds = recipeList.querySelectorAll(".idNumber");
  savedIds.forEach((savedId) => {
    savedId.remove();
  });
  let savedCategories = recipeList.querySelectorAll(".category");
  savedCategories.forEach((category) => {
    category.remove();
  });
  let buttonsToChange = recipeList.querySelectorAll(".saveBtn");
  buttonsToChange.forEach((button) => {
    button.classList.remove("saveBtn");
  });
  buttonsToChange.forEach((button) => {
    button.classList.add("deleteBtn");
  });
  buttonsToChange.forEach((button) => {
    button.innerHTML = `<i class="fa fa-trash"></i>`;
  });
}
