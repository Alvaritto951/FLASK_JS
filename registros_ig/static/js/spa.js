peticion_todos = new XMLHttpRequest() //Se utiliza new para crear una nueva variable- XMLHttpRequest es una instancia de un objeto
peticion_alta = new XMLHttpRequest()

function peticion_todos_handler() {
    if (this.readyState === 4) { //XMLHttprequest --> Petición en estado terminada
        if (this.status === 200) { //this es el manejador (XMLHttpRequest)
            //alert(this.responseText) -- Sirve para que nos salga en el navegador, antes de poder hacer nada

            //Procesar el responseText, transformarlo en un objeto(diccionario) de javascript y transformarlo en filas de la tabla
            const los_datos = JSON.parse(this.responseText) // Los datos pasan a ser una lista de diccionarios
            const la_tabla = document.querySelector("#movements_table") //Crear la estructura de tabla
            const movimientos = los_datos.data //Viene de routes dentro de la api all, del jsonify (línea 18 de routes.py)
            
            for (let i=0; i < movimientos.length; i++) {
                item = movimientos[i]
                const trow = document.createElement("tr") //Crea la fila

                const tddate = document.createElement("td") //Crea la celda de fecha
                tddate.innerHTML = item.date //Añade los datos a la celda
                trow.appendChild(tddate) //La celda se inserta en la fila

                const tdconcept = document.createElement("td")
                tdconcept.innerHTML = item.description
                trow.appendChild(tdconcept)

                const tdquantity = document.createElement("td") 
                tdquantity.innerHTML = item.quantity
                trow.appendChild(tdquantity)

                la_tabla.appendChild(trow) //Añadir la fila a la tabla
            }



        } else {
            alert("Se ha producido un error en la consulta de movimientos")
        }
    }
}

function peticion_alta_handler() {
    if (this.readyState === 4) {
        if (this.status === 201) {
            peticion_todos.open("GET", "http://localhost:5000/api/v1.0/all", true)
            peticion_todos.onload = peticion_todos_handler
            peticion_todos.onerror = function() {alert("No se ha podido completar la petición de movimientos")}
            peticion_todos.send()
        } else {
            alert("Se ha producido un error en el alta de movimientos")
        }
    }
}


function altaMovimiento(ev) {
    ev.preventDefault()
    
    const date = document.querySelector("#date").value //Capturar datos
    const concept = document.querySelector("#concept").value
    const quantity = document.querySelector("#quantity").value

    if (concept === "") { //Validar datos capturados
        alert("Debes informar el concepto")
        return
    }

    if (quantity == 0 || quantity === "") {
        alert("Debes informar una cantidad positiva o negativa")
        return
    }

    const hoy = new Date().toISOString().split('T')[0]
    if (!date || date > hoy) {
        alert("Debes informar una fecha menor o igual a hoy")
        return
    }
    
    peticion_alta.open("POST", "http://localhost:5000/api/v1.0/new", true)
    peticion_alta.onload = peticion_alta_handler
    peticion_alta.onerror = function() {alert("No se ha podido completar la petición de movimientos")} //Si todo falla, ejectura esta función
    peticion_alta.setRequestHeader("Content-Type", "application/json") //Cabecera --- Se interpreta lo que llega como un JSON
    const data_json = JSON.stringify({date: date, concept: concept, quantity: quantity}) //Convierte los datos en un json
    peticion_alta.send(data_json) //Envía el JSON
}

window.onload = function() {
peticion_todos.open("GET", "http://localhost:5000/api/v1.0/all", true) //Programación asíncrona indicando true --- Como si escribieras la url
peticion_todos.onload = peticion_todos_handler //Cuando estés cargada, te procesa handler -- Es un evento
peticion_todos.onerror = function() {alert("No se ha podido completar la petición de movimientos")} //Si todo falla, ejectura esta función
peticion_todos.send() //Si todo está correcto, lo envía/ejecuta

document.querySelector("#btn_crear").addEventListener("click", //Crear botón "Nuevo"
    function(ev) {
        ev.preventDefault() //Captura evento y predomina javascript sobre HTML
        document.querySelector("#movement_detail").classList.remove("inactive") //Hacer visible el botón de "Nuevo" quitándole la clase que tiene
        }
    )

document.querySelector("#btn_cerrar").onclick = function(ev) {
    ev.preventDefault()
    document.querySelector("#movement_detail").classList.add("inactive") //Hacer invisible el botón de "Nuevo" quitándole la clase que tiene
    }

document.querySelector("#btn_aceptar").onclick = altaMovimiento //El evento aceptar viene definida en la función
}