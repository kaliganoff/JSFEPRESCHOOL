const container = document.querySelector('.container');
const search = document.querySelector('.search');

if (localStorage.query) {
  query = localStorage.query;
  getImages(query);
} else {
  query = 'summer';
  getImages(query);
}

async function getImages(query) {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=F-CrqZ66gvClK9UaCKcUu4dEWfydP2o8-5M2Uzt0rds`);
    const data = await res.json();
    console.log(data.results);
    for (let i = 0; i < 30; i++) {
      const img = document.createElement('img');
      img.classList.add('gallery-img')
      img.src = `${data.results[i].urls.regular}`;
      img.alt = `image`;
      container.append(img);
  }
  }

  search.addEventListener('search', () => {
    container.innerHTML = ';'
    localStorage.query = search.value;
   getImages(search.value);
  })