function crearCards(arr) {
    let card = document.querySelector('#pastcard');
    card.innerHTML = " "
    arr.forEach(elemento => {
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

////////////////////////// CATEGORIAS ///////////////////////////////////////////

let categorias = document.querySelectorAll('.form-check-input');

categorias.forEach(categoria => categoria.addEventListener('change', seleccion));

let cardFiltrado = [];

function filtrarCategory(arr, seleccion) {
    cardFiltrado = []
    arr.forEach(evento => {
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
        crearCards(arr)
    }
}

function seleccion() {
    let seleccionado = Array.from(categorias).filter(categoria => categoria.checked);
    filtrarCategory(eventos, seleccionado);
}
////////////////////////// SEARCH /////////////////////////

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