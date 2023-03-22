let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

let eventos;

async function getEvents() {
  try {
    let response = await fetch(urlApi);
    let dataApi = await response.json();
    eventos = upEvents(dataApi.events, dataApi.currentDate);
    crearCards(eventos)

    const search = document.querySelector('#search')
    const boton = document.querySelector('#boton')
    boton.addEventListener('click', () => filtrar(eventos))
    search.addEventListener('input', () => filtrar(eventos))
    filtrar(eventos);

  } catch (error) {
    console.log(error.message)
  }
}

getEvents();

function upEvents(eventos, data) {
  let añopasado = []
  for (item of eventos) {
    if (item.date > data) {
      añopasado.push(item)
      
    }
  }return añopasado;
}

function crearCards(eventos) {
  let card = document.querySelector('#UpEvents');
  card.innerHTML = " "
  eventos.forEach(evento => {
    card.innerHTML += `
        <div class="card">
                <figure>
                    <img src="${evento.image}" alt="${evento.name}"/>
                </figure>
                <div class="contenido">
                    <h3>${evento.name}</h3>
                    <p>${evento.description}</p>
                    <h6>Price:$${evento.price}</h6>
                    <a href="./details.html?id=${evento._id}">Ver Más</a>
                </div>
            </div>`;
  });
}
let categorias = document.querySelectorAll('.form-check-input');

categorias.forEach(categoria => categoria.addEventListener('change', seleccion));

function seleccion() {
  let seleccionado = Array.from(categorias).filter(categoria => categoria.checked)

  filtrarCategory(eventos, seleccionado)
}

let cardFiltrado = []

function filtrarCategory(eventos, seleccion) {
  cardFiltrado = []
  eventos.forEach(evento => {
    seleccion.forEach(
      elemento => {
        if (evento.category == elemento.value) {
          cardFiltrado.push(evento)
        }
      }
    )
  })

  if (cardFiltrado.length > 0) {
    crearCards(cardFiltrado)
  } else {
    crearCards(eventos)
  }
}




////////////////////////////////// SEARCH ////////////////////////////


function filtrar(arr) {
  let buscado = []
  const texto = search.value.toLowerCase().trim();
   
    for (let evento of arr) {
    let name = evento.name.toLowerCase().trim();
    if (name.indexOf(texto) !== -1) {
      buscado.push(evento)
    }
  } if (buscado.length > 0) {
    crearCards(buscado)
  } else {
    let NoEncontrado = document.getElementById("card-template")
    NoEncontrado.innerHTML = `<p>Evento No Encontrado...</p>`
  } 
}
