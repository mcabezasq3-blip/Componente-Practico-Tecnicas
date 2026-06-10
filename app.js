/*
Cabezas Quimi Mathias Lenin
Calle Cevallos María José
Palomino Andrade Raquel Rebeca 
Sánchez Villamar Axel Frank
*/

const selectDimension = document.getElementById('select-dimension-arreglo');
const btnCargarVector = document.getElementById("btn-cargar-vector");
const btnPresentarVector = document.getElementById("id-btn-presentar-vector");
const tableTbody = document.querySelector("#id-table-vector-numerico > tbody");
const btnVaciarVector = document.getElementById("btn-vaciar-vector");

const txtRespuesta = document.getElementById("id-txt-respuesta");
const btnNumeroMayor = document.getElementById("btn-numero-mayor");
const btnNumeroMenor = document.getElementById("btn-numero-menor");
const btnSumarValores = document.getElementById("btn-sumar-valores");
const btnProductoVector = document.getElementById("btn-producto-vector");
const btnCalcularModa = document.getElementById("btn-calcular-moda");
const btnCalcularMedia = document.getElementById("btn-calcular-media");
const btnCalcularMediana = document.getElementById("btn-calcular-mediana");

const selectOrden = document.getElementById("select-orden");
const btnOrdenarSeleccion = document.getElementById("btn-ordenar-seleccion");
const btnOrdenarBurbuja = document.getElementById("btn-ordenar-burbuja");
const inputBuscar = document.getElementById("id-valor-busqueda");

let vector = [];
const NUM_MAXIMO_RANDOM = 1000;

// Animacion para los metodos de ordenamiento usando delay
let estaOrdenando = false; 
let vectorEstaOrdenado = false;
const VELOCIDAD_ANIMACION = 150; 
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


// Boton encargado de Cargar la dimension que tendrá el vector
btnCargarVector.addEventListener('click', function (e) {
    const dimension = selectDimension.value;
    cargarVector(dimension);
    txtRespuesta.value = `Operación Carga: Vector generado con ${dimension} elementos.`;
});
// Botón encargado de presentar el vector
btnPresentarVector.addEventListener("click", function(e){
  presentarVector();
});
// Función encargada de determinar la dimension y los valores del vector
function cargarVector(dimension) {
    vector = []; 
    vectorEstaOrdenado = false;
    for (let i = 0; i < dimension; i++) {
        vector[i] = Math.ceil(Math.random() * NUM_MAXIMO_RANDOM);
    }
}
// Funcion encargada de vaciar los valores del vector y su dimension
btnVaciarVector.addEventListener("click", function(e){
    vector = [];
    let vectorEstaOrdenado = false;
    tableTbody.innerHTML = ""; 
    txtRespuesta.value = "Operación Vaciado: El vector ha sido borrado.";
    inputBuscar.value = ""; 
});

// Funcion encargada de mostrar los valores del vector más el color de fondo
function presentarVector(indicesResaltados = [], colorResalte = "#00FF00") {
    let contador = 0;
    let str = "";
    while(contador < 2){
        str += "<tr>"; 
        for(let i = 0; i < vector.length; i++){
            if(contador === 0){
                str += `<td>${i}</td>`; 
            } else {
                let colorFondo = indicesResaltados.includes(i) ? colorResalte : "#00FF00";
                str += `<td bgcolor="${colorFondo}">${vector[i]}</td>`; 
            }
        }
        str += "</tr>"; 
        contador++; 
    }
    tableTbody.innerHTML = str;
}


// Filtro de busqueda que se encarga de buscar un elemento del vector, en caso de que encuentre algun valor, la casilla se pintará de verde, caso contrario mandará una alerta de numero no encontrado

inputBuscar.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
        if (vector.length === 0 || estaOrdenando) {
            alert("Error: Vector no cargado");
            return;
        }

        const valorABuscar = parseInt(inputBuscar.value);
        if (isNaN(valorABuscar)) {
            alert("Por favor, ingresa un número válido para buscar.");
            return;
        }

        let indicesEncontrados = [];
        for(let i = 0; i < vector.length; i++) {
            if (vector[i] === valorABuscar) indicesEncontrados.push(i);
        }

        if (indicesEncontrados.length > 0) {
            presentarVector(indicesEncontrados, "#00FFFF");
            txtRespuesta.value = `Búsqueda: El valor ${valorABuscar} se encontró en la(s) posición(es): ${indicesEncontrados.join(", ")}`;
        } else {
            alert(`El valor ${valorABuscar} no se encuentra dentro del vector.`);
            presentarVector(); 
            txtRespuesta.value = `Búsqueda: Valor no encontrado.`;
        }
    }
});



// Boton encargado de determinar el numero mayor del vector
btnNumeroMayor.addEventListener("click", function() {
    let mayor = vector[0]; let posicion = 0;
    for(let i = 1; i < vector.length; i++){
        if(vector[i] > mayor) { 
            mayor = vector[i];
            posicion = i; 
        }
    }
    txtRespuesta.value = `Valor Máximo: ${mayor} (encontrado en posición ${posicion})`;
});
// Boton encargado de determinar el numero menor del vector
btnNumeroMenor.addEventListener("click", function() {
    let menor = vector[0]; let posicion = 0;
    for(let i = 1; i < vector.length; i++){
        if(vector[i] < menor)
            { 
            menor = vector[i];
            posicion = i;
            }
    }
    txtRespuesta.value = `Valor Mínimo: ${menor} (encontrado en posición ${posicion})`;
});
// Boton encargado de determinar la suma total de los valores del vector
btnSumarValores.addEventListener("click", function() {
    let suma = 0;
    for(let i = 0; i < vector.length; i++){
        suma += vector[i]; 
        }
    txtRespuesta.value = `Suma de Valores: ${suma} (total acumulado de todos los elementos)`;
});

// Boton encargado de determinar la multiplicacion total de los valores del vector
btnProductoVector.addEventListener("click", function() {
    let producto = 1; 
    for(let i = 0; i < vector.length; i++){
         producto *= vector[i]; 
         }
    txtRespuesta.value = `Producto de Valores: ${producto} (multiplicación de todos los elementos)`;
});

// Botón encargado de determinar la media aritmética del vector
btnCalcularMedia.addEventListener("click", function() {
    if (!vectorEstaOrdenado) {
        alert("Atención: El vector debe estar ordenado primero (Usa Selección o Burbuja).");
        return;
    }

    let suma = 0;
    for(let i = 0; i < vector.length; i++){
         suma += vector[i];
    }
    let media = suma / vector.length;
    txtRespuesta.value = `Media (Promedio): ${media.toFixed(2)}`; 
});

// Botón encargado de determinar la mediana aritmética del vector
btnCalcularMediana.addEventListener("click", function() {
    if (!vectorEstaOrdenado) {
        alert("Atención: El vector debe estar ordenado primero (Usa Selección o Burbuja).");
        return;
    }

    // consta en sacar el valor central del vector
    let mitad = Math.floor(vector.length / 2);
    let mediana;
    
    if (vector.length % 2 === 0) {
        mediana = (vector[mitad - 1] + vector[mitad]) / 2;
    } else {
        mediana = vector[mitad];
    }
    
    txtRespuesta.value = `Valor Mediana: ${mediana} (valor central del arreglo)`;
});

// Botón encargado de determinar la moda aritmética del vector
btnCalcularModa.addEventListener("click", function() {
    if (!vectorEstaOrdenado) {
        alert("Atención: El vector debe estar ordenado primero (Usa Selección o Burbuja).");
        return;
    }

    let frecuencias = {}; 
    let maxRepeticiones = 0; 
    let moda = []; 
    // Consiste en determinar la cantidad de numeros iguales que existen en el vector por medio de contadores
    for(let i = 0; i < vector.length; i++){
        let num = vector[i];
        
        if (frecuencias[num]) {
            frecuencias[num] = frecuencias[num] + 1;
        } else {
            frecuencias[num] = 1;
        }
        
        if(frecuencias[num] > maxRepeticiones) {
            maxRepeticiones = frecuencias[num];
        }
    }
    
    for(let num in frecuencias){ 
        if(frecuencias[num] === maxRepeticiones) {
            moda.push(num); 
        }
    }
    
    if (maxRepeticiones === 1) {
        txtRespuesta.value = "Valor Moda: Ninguno";
    } else {
        txtRespuesta.value = `Valor Moda: ${moda.join(", ")} (se repite ${maxRepeticiones} veces)`;
    }
});

// ALGORITMOS DE ORDENAMIENTO 

btnOrdenarSeleccion.addEventListener("click", async function() {
    estaOrdenando = true; 
    const orden = selectOrden.value; 
    txtRespuesta.value = `Ordenando por Selección...`;
    // Recorre las posiciones del vector mediante el orden ya sea mayor o menor
    for (let i = 0; i < vector.length - 1; i++) {
        let indiceActual = i;
        
        // 1. Buscamos el menor (o mayor) en el resto del arreglo
        for (let j = i + 1; j < vector.length; j++) {
            if (orden === "asc" && vector[j] < vector[indiceActual]) indiceActual = j;
            if (orden === "desc" && vector[j] > vector[indiceActual]) indiceActual = j;
        }
        
        // 2. Solo si encontramos uno para intercambiar lo movemos y hacemos la pausa visual
        if (indiceActual !== i) {
            let temporal = vector[i];
            vector[i] = vector[indiceActual];
            vector[indiceActual] = temporal;
            
            presentarVector([i, indiceActual], "#FF8C00"); 
            await sleep(VELOCIDAD_ANIMACION);
        }
    }
    vectorEstaOrdenado = true;
    estaOrdenando = false; 
    presentarVector(); // Terminamos, todo a verde
    txtRespuesta.value = `Ordenamiento Selección: Completado en orden ${orden === 'asc' ? 'Ascendente' : 'Descendente'}.`;
});


btnOrdenarBurbuja.addEventListener("click", async function() {
    estaOrdenando = true; 
    const orden = selectOrden.value; 
    txtRespuesta.value = `Ordenando por Burbuja...`;
    
    for (let i = 0; i < vector.length - 1; i++) {
        for (let j = 0; j < vector.length - 1 - i; j++) {
            
            // 1. Condición de intercambio clásica
            let hacerIntercambio = false;
            if (orden === "asc" && vector[j] > vector[j + 1]) hacerIntercambio = true;
            if (orden === "desc" && vector[j] < vector[j + 1]) hacerIntercambio = true;
            
            // 2. Si hay que moverlos, lo hacemos y activamos la pausa visual
            if (hacerIntercambio) {
                let temporal = vector[j];
                vector[j] = vector[j + 1];
                vector[j + 1] = temporal;
                
                presentarVector([j, j + 1], "#FF8C00");
                await sleep(VELOCIDAD_ANIMACION);
            }
        }
    }
    vectorEstaOrdenado = true;
    estaOrdenando = false; 
    presentarVector(); 
    txtRespuesta.value = `Ordenamiento Burbuja: Completado en orden ${orden === 'asc' ? 'Ascendente' : 'Descendente'}.`;
});