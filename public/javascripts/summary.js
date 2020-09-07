// Fetch and display requested data from Bing API
const fetcher = (event) => { 
  const name = event.target.className;
  const trend = event.target.parentElement.firstChild.textContent.substring(1);
  fetch(`/trending/${name}/${trend}`)
  .then((res) => res.json()).then((data) => {
    let parent = event.target.parentElement;
    if (parent.childNodes.length <= 4) {
      if (name == "news") {
        for (let story of data.stories) {     
          let p = document.createElement("p");
          let a = document.createElement("a");
          a.href = story.url;
          a.textContent = story.name
          p.appendChild(a);
          parent.append(p);
        }
      } else {
        parent.append(document.createElement("br"));
        for (let story of data.stories) {
          let img = document.createElement("IMG");
          img.src = story.contentUrl;
          img.alt = story.name;
          img.height = "200";
          parent.append(" ", img);
        }
      }
    } else {
      for (let i = parent.childNodes.length-1; i > 3 ; i--) {
        parent.childNodes[i].remove();
      }
    }
  })
  .catch((error) => console.log(error));
};

// Add an event listeners to buttons
const news = document.getElementsByClassName("news");
const pics = document.getElementsByClassName("pics");
for (let button of news) {
  button.addEventListener("click", (event) => fetcher(event));
}
for (let button of pics) {
  button.addEventListener("click", (event) => fetcher(event));
}
