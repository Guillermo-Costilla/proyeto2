let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

let eventos;
let categorys = [];
let upEventos = [];
let pasado = [];

async function getEvents() {
    try {
        let response = await fetch(urlApi);
        let dataApi = await response.json();
        eventos = dataApi.events
        printStats(eventos)
        let categorys = extractCategory(eventos);
        upEventos = upEvents(eventos, dataApi.currentDate)
        pasado = pastEvents(eventos, dataApi.currentDate)
        
        eventosPorAsistencia(upEventos, pasado)
    } catch (error) {
        console.log(error.message)
    }
}

getEvents();

// saco los porcentajes de asistencia
function porcentajes(data) {
    let porcentaje = (data.assistance * 100 / data.capacity)
    return porcentaje
}
// evento con mas asistencia
function masAsistencia(arr) {
    return arr.reduce((acumulador, valorActual) => {
        if (porcentajes(valorActual) > porcentajes(acumulador)) {
            return valorActual;
        } else {
            return acumulador
        }
    })
}
//evento con menor asistencia
function menorAsitencia(arr) {
    return arr.reduce((acumulador, valorActual) => {
        if (porcentajes(valorActual) < porcentajes(acumulador)) {

            return valorActual;
        } else {
            return acumulador
        }
    })
}
// evento con mayor capacidad
function capacidades(arr) {
    return arr.reduce((acumulador, valorActual) => {
        if (valorActual.capacity > acumulador.capacity) {

            return valorActual;
        } else {
            return acumulador
        }
    })
}
//impresion de stats
function printStats(arr) {
    let container = document.querySelector(".primario");
    let masC = masAsistencia(arr);
    let menosC = menorAsitencia(arr);
    let capacidad = capacidades(arr);
    container.innerHTML += `
        <tr>
            <td class="td">${masC.name}:  ${(porcentajes(masC)).toFixed(2)}% </td>
            <td class="td">${menosC.name}:  ${(porcentajes(menosC)).toFixed(2)}% </td>
            <td class="td">${capacidad.name}:  ${capacidad.capacity} </td>
        </tr>`
}
///////////////////////////////////////////////////////////////////////////
// 2da Parte Upcoming Events Stats //

function extractCategory(arr) {
    let categorys = [];
    arr.forEach(elemento => {
        if (!categorys.includes(elemento.category)) {
            categorys.push(elemento.category);
        }
    }); return categorys;
};

function upEvents(eventos, data) {
    let upEventos = []
    for (item of eventos) {
        if (item.date > data) {
            upEventos.push(item)

        }
    } return upEventos;
}

function pastEvents(eventos, data) {
    let pasado = []
    for (item of eventos) {
        if (item.date < data) {
            pasado.push(item)

        }
    } return pasado;
}

 function futuro(arr,categorias) {
     let ganancias = [];
     let acumulador = 0;
    arr.forEach(evento => {
        categorias.forEach(categoria => {
            if (evento.category == categoria) {
                acumulador += evento.price * evento.estimate 
                ganancias.push(acumulador) 
            }else{
                console.log('la categoria del evento no')
            }
        })
    }); console.log(ganancias) 
    
} 

