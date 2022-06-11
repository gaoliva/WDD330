const links = [
    {
      label: "Week1 Notes",
      url: "week01/index.html"
    },
    {
      label: "Week2 Notes",
      url: "week02/index.html"
    },
    {
      label: "Week3 Notes",
      url: "week03/index.html"
    },
    {
      label: "Week4 Notes",
      url: "week04/index.html"
    },
    {
      label: "Week5 Notes",
      url: "week05/index.html"
    },
    {
      label: "Week6 Midterm",
      url: "week06/index.html"
    },
    {
      label: "Week7 Notes",
      url: "week07/index.html"
    }
  ]

function loadIndex(){
    const ol = document.querySelector("#linksList");

    links.forEach( link => {
        const li = document.createElement("li");
        const href = document.createElement("a");
        href.setAttribute("href", link.url);
        href.innerText = link.label;

        li.appendChild(href);
        ol.appendChild(li);
    })
}
