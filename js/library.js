//Libreria para funciones comunes a todas las clases

//Metodo para parsear a JSON la respuesta de la API
function parseJsonString(json) {
    var result = JSON.parse(json);
    return result;
}

//Metodo para setear cookies. Principalmente usado para guardar el idSesion que backend envia en el login.
function setCookie(name,value) {
    Document.cookie = name + "=" + value + ";" ;
}

//Metodo para devolver cookie.
function getCookie(name) {
    var nameEQ = name + "=";
    var cookie_arr = Document.cookie.split(';');
    for(var i=0;i < cookie_arr.length;i++) {
        var cookie = cookie_arr[i];
        if(cookie.includes(name)) {
            var cookie_substring = cookie.split("=");
            var cookie_value = cookie_substring[1];
            return cookie_value;
        }
    }
    return null;
}

//Metodo para borrar cookie.
function dropCookie(name) {
	Document.cookie = name + "=;" ;
}

//Metodo de testing unitario de setCookie
var testSetCookie = function(name, value) {
    setCookie(name, value);
    var cookie_array = Document.cookie.split(";");
    var cookie = cookie_array[0].split("=");
    var cookie_name = cookie[0];
    var cookie_value = cookie[1];
    if (!cookie_name.includes(name) || !cookie_value.includes(value)) {
        setCookie(name,"");
        return "setCookie function returning errors."
    }
    setCookie(name,"");
    return null;
    
}

//Metodo de testing unitario de getCookie
var testGetCookie = function(name) {
    
    Document.cookie = name + "= 1 ;" ;
    var cookie = getCookie(name);
   if(cookie.includes(1)) {
       dropCookie(name);
        return null;
    }
    dropCookie(name);
    return "getCookie() returning error. Library method getCookie() not returning correct cookie value";
}

//Metodo de testing unitario de dropCookie
var testDropCookie = function(name) {
    Document.cookie = name + "=1;";
    var cookie = getCookie(name);
    if (cookie.includes("1")) {
        dropCookie(name);
        cookie = getCookie(name);
        if (cookie=="") {
            return null;
        }
    }
    return "dropCookie() returning error. Library method dropCookie() not returning correct cookie value";
}

//Metodo de testing unitario de la Libreria
function testLibrary() {
    
    var testSetCookieResults = testSetCookie("hola", 3);
    var testGetCookieResults = testGetCookie("hola");
    var testDropCookieResults = testDropCookie("hola");

    if (testSetCookieResults!==null) {
        return "Error encountered in function setCookie: " + testSetCookieResults;
    }

    if (testGetCookieResults!==null) {
        return "Error encountered in function getCookie: " + testGetCookiegResults;
    }

    if(testDropCookieResults!==null) {
        return "Error encountered in function dropCookie: " + testDropCookiegResults;
    }
    return null;
}