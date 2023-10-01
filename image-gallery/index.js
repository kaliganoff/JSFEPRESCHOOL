const container = document.querySelector('.container');
const search = document.querySelector('.search');

if (localStorage.query) {
  query = localStorage.query;
  getImages(query);
} else {
  query = 'summer';
  getImages(query);
}

search.focus();
search.select();
search.placeholder = query;

async function getImages(query) {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=F-CrqZ66gvClK9UaCKcUu4dEWfydP2o8-5M2Uzt0rds`);
    const data = await res.json();
    for (let i = 0; i < 30; i++) {
      const div = document.createElement('div');
      div.classList.add('gallery-img-container')
      container.append(div);
      const img = document.createElement('img');
      img.classList.add('gallery-img')
      img.src = `${data.results[i].urls.regular}`;
      img.alt = `image`;
      div.append(img);
      img.addEventListener('click', () =>{
        window.open(img.src);
      })
  }
  }

  search.addEventListener('search', () => {
    if (search.value) {
      container.innerHTML = '';
      localStorage.query = search.value;
      getImages(search.value);
    }
  })