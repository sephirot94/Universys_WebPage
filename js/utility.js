//Esta funcion recorre el mapa de codigos que devuelve la api y retorna el valor del codigo devuelto en el mapa, 
//que contiene una pagina a la que el sitio redireccionara. Luego, redirecciona a esa pagina.
function redirectorSearch(json, mapa) {
    var codigo = json.error-code;
    for(var key in mapa) {
        if(codigo==key) {
            window.location.href = '../html/' + key[value];
        }
    }
}