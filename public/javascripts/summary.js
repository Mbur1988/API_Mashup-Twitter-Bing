// Fetch the summary of the article from our Express API
const fetchSummary = (event) => {  
  const trend = event.target.textContent.substring(1);
  //console.log(trend);
  fetch(`/trending/news/${trend}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let parent = event.target.parentElement;   
    for (let story of data.stories) {      
      let p = document.createElement("p");
      let a = document.createElement("a");
      a.href = story.url;
      a.textContent = story.name
      p.appendChild(a);
      parent.append(p);
    }
  })
  .catch((error) => console.log(error));
};

// Add an event listener to each article title
const trends = document.getElementsByClassName("trend");
//console.log(trends);
for (let trend of trends) {
  trend.addEventListener("click", (event) => fetchSummary(event));
}
