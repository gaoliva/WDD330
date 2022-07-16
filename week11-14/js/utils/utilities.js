export function getJSON(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function toggleRecipeList() {
  let updateElement = document.getElementById("saved");
  updateElement.classList.toggle("hidden-saved");
  let savedBtn = document.getElementById("reading-list-btn");
  if (savedBtn.innerHTML == "Hide My Recipes") {
    savedBtn.innerHTML = "Show My Recipes";
  } else {
    savedBtn.innerHTML = "Hide My Recipes";
  }
}

export function toggleRecipeListSmall() {
  let savedBtn = document.getElementById("reading-list-btn");
  const mediaQueryList = window.matchMedia("(min-width: 750px)");

  if (mediaQueryList.matches) {
    savedBtn.removeEventListener("click", toggleRecipeList);
    savedBtn.innerHTML = "My Recipes";
  } else {
    savedBtn.innerHTML = "Show My Recipes";
    savedBtn.addEventListener("click", toggleRecipeList);
  }
}
