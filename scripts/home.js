let eventos = data.events

let categorias = document.querySelectorAll('.form-check-input')

categorias.forEach(categoria => categoria.addEventListener('change', seleccion))

function crearCards(arr, contenedor) {
  let card = document.querySelector(contenedor);
  card.innerHTML = " "
  arr.forEach((elemento) => {
    card.innerHTML += `
        <div class="card">
                <figure>
                    <img src="${elemento.image}" alt="${elemento.name}"/>
                </figure>
                <div class="contenido">
                    <h3>${elemento.name}</h3>
                    <p>${elemento.description}</p>
                    <h6>Price:$${elemento.price}</h6>
                    <a href="./details.html?id=${elemento._id}">Ver Más</a>
                </div>
            </div>`;
  });
}

function seleccion() {
  let seleccionado = Array.from(categorias).filter(categoria => categoria.checked)

  filtrarCategory(eventos, seleccionado)
}

let cardFiltrado = []
function filtrarCategory(eventos, arrayInputs) {
  cardFiltrado = []
  eventos.forEach(evento => {
    arrayInputs.forEach(
      elemento => {
        if (evento.category == elemento.value) {
          cardFiltrado.push(evento)
        }
      }
    )
  })

  if (cardFiltrado.length > 0) {
    crearCards(cardFiltrado, "#card-template")
  } else {
    crearCards(eventos, "#card-template")
  }
}
crearCards(eventos, "#card-template")






const search = document.querySelector('#search')

const boton = document.querySelector('#boton')

let buscado = []

const filtrar = () => {
  let buscado = []
  const texto = search.value.toLowerCase().trim();
  
  for (evento of eventos) {
    let name = evento.name.toLowerCase().trim();
    if (name.indexOf(texto) !== -1) {
      buscado.push(evento)}
  }if (buscado.length > 0) {
    crearCards(buscado, "#card-template")
  } else {
    let NoEncontrado = document.getElementById("card-template")
    NoEncontrado.innerHTML = `<p>Evento No Encontrado...</p>`
  }
}

boton.addEventListener('click', filtrar)
search.addEventListener('keyup', filtrar)
filtrar()





