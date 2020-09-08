// Fetch and display requested data from Bing API
const fetcher = (event) => {
  const name = event.target.className;
  const trend = event.target.parentElement.firstChild.textContent.substring(1);
  fetch(`/trending/${name}/${trend}`)
    .then((res) => res.json()).then((data) => {
      let parent = event.target.parentElement;
      let current = "";
      if (parent.childNodes.length > 4) {
        if (parent.childNodes[4].nodeName == "BR") { current = "pics" }
        else if (parent.childNodes[4].nodeName == "P") { current = "news" }
        for (let i = parent.childNodes.length - 1; i > 3; i--) {
          parent.childNodes[i].remove();
        }
      }
      if (name == "news" && name != current) {
        for (let story of data.stories) {
          let p = document.createElement("p");
          let a = document.createElement("a");
          p.className = "news";
          a.href = story.url;
          a.textContent = story.name
          p.appendChild(a);
          parent.append(p);
        }
      } else if (name == "pics" && name != current) {
        parent.append(document.createElement("br"));
        for (let story of data.stories) {
          let img = document.createElement("img");
          img.src = story.contentUrl;
          img.alt = story.name;
          img.height = "200";
          parent.append(" ", img);
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
