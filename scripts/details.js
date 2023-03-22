let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

let eventos;

async function getEvents() {
  try {
    let response = await fetch(urlApi);
    let dataApi = await response.json();
    eventos = dataApi.events;
    details()
  } catch (error) {
    console.log(error.message)
  }
}

getEvents();

function details() {
  const queryString = location.search

  const parametros = new URLSearchParams(queryString)

  console.log(eventos)
  const id = parametros.get("id")


  const caso = eventos.find(evento => evento._id == id)

  let contenedor = document.querySelector(".contains")
  contenedor.innerHTML = `<div class="card-details">
  <figure>
      <img  class="image-details" src="${caso.image}" alt="${caso.name}">
  </figure>
  <div clas="contenido-details">
      <h3 id="h3">${caso.name}</h3>
      <p class="parrafo">Date: ${caso.date}</p>
      <p class="parrafo"> ${caso.description}</p>
      <p class="parrafo">Category: ${caso.category}</p>
      <p class="parrafo">Place: ${caso.place}</p>
      <p class="parrafo">Capacity: ${caso.capacity}</p>
      <p class="parrafo">Estimate/Assistance: ${caso.estimate || caso.assistance}</p>
      <p class="parrafo">Price:$${caso.price}</p>
  </div>
</div>`
}
details();