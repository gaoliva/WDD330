const toDoList = getList();

//Query Selectors
const addBtn = document.querySelector(".add-items");
const listButtons = document.querySelector("ul");
const resetBtn = document.getElementById("reset-btn");
const filterButtons = document.getElementById("filter-btns");
const listCount = document.getElementById("task-count");

//Add event listeners
addBtn.addEventListener("submit", addToDo);
listButtons.addEventListener("click", listInteractions);
filterButtons.addEventListener("click", filterList);
resetBtn.addEventListener("click", resetList);

//Get list element from document
function getList() {
  return document.querySelector(".toDoList");
}

//Get list items from local storage
function getItems() {
  return JSON.parse(localStorage.getItem("items")) || [];
}

//Add task to local storage and to list
function addToDo(e) {
  const items = getItems();
  e.preventDefault();
  const id = new Date();
  const text = this.querySelector("[name=item]").value;
  const item = {
    id,
    text,
    done: false,
  };
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, toDoList);
  this.reset();
}

//Check task off in local storage and from list
function checkToDo(e) {
  const items = getItems();
  const el = e.target;
  const index = el.dataset.index;
  if (!e.target.matches("input")) return;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, toDoList);
}

//Delete task from local storage and from list
function deleteToDo(e) {
  const items = getItems();
  let item = e.target.parentNode;
  let data = item.getAttribute("id");
  item.remove();
  items.splice(`${data}`, 1);
  localStorage.setItem("items", JSON.stringify(items));
}

//Clear the whole list
function resetList(e) {
  console.log("time to reset");
  localStorage.clear();
  location.reload();
}

//Display list from local storage
function populateList(items = [], toDoList) {
  toDoList.innerHTML = items
    .map((item, i) => {
      return `
      <li class="list-item" id="${i}">
        <div>
        <input class='checkbox' name="checkbox" type="checkbox" data-index=${i} id="items${i}" ${
        item.done ? "checked" : ""
      }/>
        <label for="items${i}">${item.text}</label>
        </div>
        <button name="remove-btn" type=button class="remove-btn">X</button>
      </li>
      `;
    })
    .join("");
}

//// UTILITY STUFF

function listInteractions(e) {
  if (e.target.name == "add-btn") addToDo(e);

  if (e.target.name == "checkbox") checkToDo(e);

  if (e.target.name == "remove-btn") deleteToDo(e);
}

//// FILTER STUFF

//Function to filter list
function filterList(e) {
  if (e.target.id == "all") showAll();

  if (e.target.id == "active") showActive();

  if (e.target.id == "completed") showCompleted();
}

//Individual filter functions
function showActive(e) {
  const items = getItems();
  const active = items.filter(function (item) {
    if (item.done === false) {
      return item;
    }
  });
  populateList(active, toDoList);
}

function showCompleted(e) {
  const items = getItems();
  const complete = items.filter(function (item) {
    if (item.done !== false) {
      return item;
    }
  });
  populateList(complete, toDoList);
}

function showAll(e) {
  const items = getItems();
  populateList(items, toDoList);
}

//populate starting list
showAll();

////LIST STUFF
