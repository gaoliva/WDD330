const toDoList = getList();

//Query Selectors
const addBtn = document.querySelector(".add-tasks");
const listButtons = document.querySelector("ul");
const listCount = document.getElementById("task-count");
const filterButtons = document.getElementById("filter-btns");
const filterAll = document.getElementById("all");
const filterComplete = document.getElementById("completed");
const filterActive = document.getElementById("active");

//Add event listeners
addBtn.addEventListener("submit", addToDo);
listButtons.addEventListener("click", listInteractions);
filterButtons.addEventListener("click", filterList);

//Get list of elements
function getList() {
  return document.querySelector(".toDoList");
}

//Get list of tasks from local storage
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


//Display list from local storage
function populateList(tasks = [], toDoList) {
  toDoList.innerHTML = tasks
    .map((task, i) => {
      return `
      <li class="list-task" id="${i}">
        <div>
        <input class='checkbox' name="checkbox" type="checkbox" data-index=${i} id="items${i}" ${
        task.done ? "checked" : ""
      }/>
        <label for="items${i}">${task.text}</label>
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
  const tasks = getItems();
  const active = tasks.filter( (task) => {
    if (task.done === false) {
      return task;
    }
  });
  const taskCount = active.length;
  populateList(active, toDoList);
  filterAll.style.backgroundColor = ''
  filterActive.style.backgroundColor = 'blue'
  filterComplete.style.backgroundColor = '' 
  return listCount.innerHTML = taskCount + ' task(s) still active'
}

function showCompleted(e) {
  const tasks = getItems();
  const complete = tasks.filter((task) => {
    if (task.done !== false) {
      return task;
    }
  });
  const taskCount = complete.length;
  populateList(complete, toDoList);
  filterAll.style.backgroundColor = ''
  filterActive.style.backgroundColor = ''
  filterComplete.style.backgroundColor = 'blue' 
  return listCount.innerHTML = taskCount + ' task(s) completed'
}

function showAll(e) {
  const tasks = getItems();
  const taskCount = tasks.length;
  populateList(tasks, toDoList);
  filterAll.style.backgroundColor = 'blue'
  filterActive.style.backgroundColor = ''
  filterComplete.style.backgroundColor = '' 
  return listCount.innerHTML = taskCount + ' task(s) total'
}

//Populate on load
showAll();