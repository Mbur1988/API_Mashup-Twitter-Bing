// Fetch and display news articles from Bing news API
const fetchNews = (event) => { 
  const trend = event.target.parentElement.firstChild.textContent.substring(1);
  fetch(`/trending/news/${trend}`)
  .then((res) => res.json())
  .then((data) => {
    let parent = event.target.parentElement;
    if (parent.childNodes.length <= 4) {
      for (let story of data.stories) {      
        let p = document.createElement("p");
        let a = document.createElement("a");
        a.href = story.url;
        a.textContent = story.name
        p.appendChild(a);
        parent.appendChild(p);
      }
    } else {
      for (let i = parent.childNodes.length-1; i > 3 ; i--)
      parent.childNodes[i].remove();
    }
  })
  .catch((error) => console.log(error));
};

// Fetch and display images from Bing images API
const fetchPics = (event) => { 
  console.log(event); 
  const trend = event.target.parentElement.firstChild.textContent.substring(1);
  fetch(`/trending/pics/${trend}`)
  .then((res) => res.json())
  .then((data) => {
    let parent = event.target.parentElement;
    if (parent.childNodes.length <= 4) {
      for (let story of data.stories) {
        let p = document.createElement("p");
        let a = document.createElement("a");
        a.href = story.url;
        a.textContent = story.name
        p.appendChild(a);
        parent.append(p);
      }
    } else {
      for (let i = parent.childNodes.length-1; i > 3 ; i--)
      parent.childNodes[i].remove();
    }
  })
  .catch((error) => console.log(error));
};

// Add an event listener to each article title
const news = document.getElementsByClassName("news");
for (let button of news) {
  button.addEventListener("click", (event) => fetchNews(event));
}

// Add an event listener to each article title
const pics = document.getElementsByClassName("pics");
for (let button of pics) {
  button.addEventListener("click", (event) => fetchPics(event));
}
