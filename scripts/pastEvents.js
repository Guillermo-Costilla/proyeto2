function pastEvents(array, dato) {
    let año2021 = []
    for (item of data.events) {
        if (item.date < dato) {
            año2021.push(item)
        }
    }
    return año2021
}

let anio2021 = pastEvents(data.events, data.currentDate)

let categorias = document.querySelectorAll('.form-check-input')
console.log(categorias)

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

    filtrarCategory(anio2021, seleccionado)
}

let cardFiltrado = []
function filtrarCategory(anio2021, arrayInputs) {
    cardFiltrado = []
    anio2021.forEach(evento => {
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
        crearCards(anio2021, "#card-template")
    }
}

crearCards(anio2021, "#card-template")



const search = document.querySelector('#search')

const boton = document.querySelector('#boton')

let buscado = []

const filtrar = () => {
  let buscado = []
  const texto = search.value.toLowerCase().trim();
  
  for (evento of anio2021) {
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