const links = [
  {
    label: "Week 1 Notes",
    url: "week01/index.html",
  },
  {
    label: "Week 2 Notes",
    url: "week02/index.html",
  },
  {
    label: "Week 3 Notes",
    url: "week03/index.html",
  },
  {
    label: "Week 4 Notes",
    url: "week04/index.html",
  },
  {
    label: "Week 5 Notes",
    url: "week05/index.html",
  },
  {
    label: "Week 6 Midterm",
    url: "week06/index.html",
  },
  {
    label: "Week 7 Notes",
    url: "week07/index.html",
  },
  {
    label: "Week 8 Notes",
    url: "week08/index.html",
  },
  {
    label: "Week 9 Notes",
    url: "week09/index.html",
  },
  ,
  {
    label: "Week 10 Notes",
    url: "week10/index.html",
  },
];

function loadIndex() {
  const ol = document.querySelector("#linksList");

  links.forEach((link) => {
    const li = document.createElement("li");
    const href = document.createElement("a");
    href.setAttribute("href", link.url);
    href.innerText = link.label;

    li.appendChild(href);
    ol.appendChild(li);
  });
}
