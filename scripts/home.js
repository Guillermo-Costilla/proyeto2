let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

let eventos;

async function getEvents() {
  try {
    let response = await fetch(urlApi);
    let dataApi = await response.json();
    eventos = dataApi.events;
    
    crearCards(eventos);
    
    const search = document.querySelector('#search')
    const boton = document.querySelector('#boton')
    boton.addEventListener('click', () =>filtrar(eventos))
    search.addEventListener('input', () =>filtrar(eventos))
    filtrar(eventos);

  } catch (error) {
    console.log(error.message)
  }
}

getEvents();



let categorias = document.querySelectorAll('.form-check-input');

categorias.forEach(categoria => categoria.addEventListener('change', seleccion));

function crearCards(eventos) {
  let card = document.querySelector('#card-template');
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

/////////////////////////////// CATEGORIAS ////////////////////////////////////////

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
crearCards();



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


