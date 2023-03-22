let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

let eventos;

async function getEvents() {
  try {
    let response = await fetch(urlApi);
    let dataApi = await response.json();
    eventos = dataApi.events;
    pastEvents(eventos, dataApi.currentDate);
    let pasado = pastEvents(eventos, dataApi.currentDate);

    const search = document.querySelector('#search')
    const boton = document.querySelector('#boton')
    boton.addEventListener('click', () => filtrar(pasado))
    search.addEventListener('input', () => filtrar(pasado))
    filtrarCategory(pasado ,seleccion);
    filtrar(pasado);

  } catch (error) {
    console.log(error.message)
  }
}

getEvents();

function pastEvents(eventos, data) {
  let añopasado = []
  for (item of eventos) {
    if (item.date < data) {
      añopasado.push(item)
      
    }
  }
}


