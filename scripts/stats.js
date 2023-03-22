let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

let eventos;
let data;

async function getEvents() {
    try {
        let response = await fetch(urlApi);
        let dataApi = await response.json();

        eventos = dataApi.events;
        data = dataApi.currentDate;

        /* pastEvents(eventos, data);
        upEvents(eventos, data); */
        extractCategory(eventos)

    } catch (error) {
        console.log(error.message);
    }
}

getEvents();

/* function pastEvents(eventos, data) {
    let añopasado = []
    for (let item of eventos) {
        if (item.date < data) {
            añopasado.push(item)
        }
    }
    resultado = 0;
    resultado = arr.assistance * 100 / arr.capacity + "%";
}


function upEvents(eventos, data) {
    let añofuturo = []
    for (let item of eventos) {
        if (item.date > data) {
            añofuturo.push(item)
        }
    }
    resultado = 0;
    resultrado = arr.estimate * 100 / arr.capacity + "%";
} */


/* function getBigger(pokemons) {
    return pokemons.reduce((acumulador, valorActual) => {
        if (valorActual.height > acumulador.height) {
            return valorActual;
        } else {
            return acumulador;
        }
    });
} */
/* 
Math.min(resultado = 0
        resultado = evento.estimate * 100 / evento.capacity + "%") */

function extractCategory(eventos) {
    let categorias = [];
    eventos.forEach(evento => {
            if (categorias.includes(evento.category)) {
                categorias.push(evento);
            }
        }); console.log(categorias);
    };
    
      eventos.filter(evento.category)