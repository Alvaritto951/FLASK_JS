peticion_todos = new XMLHttpRequest() //Se utiliza new para crear una nueva variable- XMLHttpRequest es una instancia de un objeto

function peticion_todos_handler() {
    if (this.readyState === 4) { //XMLHttprequest --> Petición en estado terminada
        if (this.status === 200) { //this es el manejador (XMLHttpRequest)
            alert(this.responseText)
            //TODO: Procesar el responseText, transformarlo en un objeto(diccionario) de javascript
            //      y transformarlo en filas de la tabla

            const los_datos = JSON.parse(this.responseText) // Los datos pasan a ser una lista de diccionarios
            const la_tabla = document.querySelector("#movements_table") //Crear la estructura de tabla
            const movimientos = los_datos.data
            
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


window.onload = function() {
peticion_todos.open("GET", "http://localhost:5000/api/v1.0/all", true) //Programación asíncrona indicando true --- Como si escribieras la url
peticion_todos.onload = peticion_todos_handler //Cuando estés cargada, te procesa handler -- Es un evento
peticion_todos.onerror = function() {alert("No se ha podido completar la petición de movimientos")} //Si todo falla, ejectura esta función
peticion_todos.send() //Si todo está correcto, lo envía/ejecuta
}