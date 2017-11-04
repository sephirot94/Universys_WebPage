//Libreria para funciones comunes a todas las clases

//Metodo para parsear a JSON la respuesta de la API
function parsejsonstring(json) {
    var result = JSON.parse(json);
    return result;
}

//Metodo para setear cookies. Principalmente usado para guardar el idSesion que backend envia en el login.
function setCookie(name,value) {
    var expires = "";
    document.cookie = name + "=" + value + ";" ;
}

//Metodo para devolver cookie.
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//Metodo para borrar cookie.
function dropCookie(name) {
	createCookie(name,"",-1);
}