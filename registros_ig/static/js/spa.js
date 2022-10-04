peticion_todos = new XMLHttpRequest() //Se utiliza new para crear una nueva variable

function peticion_todos_handler() {
    if (this.readyState === 4) //XMLHttprequest --> Petición en estado terminada
    {
        if (this.status === 200) {
            alert(this.responseText)
            //TODO: Procesar el responseText, transformarlo en un objeto(diccionario) de javascript
            //      y transformarlo en filas de la tabla

            los_datos = JSON.parse(this.responseText) // Los datos pasan a ser una lista de diccionarios




        } else {
            alert("Se ha producido un error en la consulta de movimientos")
        }
    }
}


window.onload = function() {
peticion_todos.open("GET", "http://localhost:5000/api/v1.0/all", true) //Programación asíncrona indicando true
peticion_todos.onload = peticion_todos_handler //Cuando estés cargada, te procesa handler
peticion_todos.onerror = function() {alert("No se ha podido completar la petición de movimientos")}
peticion_todos.send()
}