//Libreria para funciones comunes a todas las clases

//Metodo para parsear a JSON la respuesta de la API
function parsejsonstring(json) {
    var result = JSON.parse(json);
    return result;
}

//Metodo para setear cookies. Principalmente usado para guardar el idSesion que backend envia en el login.
function setCookie(name,value) {
    document.cookie = name + "=" + value + ";" ;
}

//Metodo para devolver cookie.
function getCookie(name) {
    var nameEQ = name + "=";
    var cookie_arr = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
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
	document.cookie = name + "=;" ;
}

//Metodo de testing unitario de parseJsonString
var testParseJsonString = function () {
    
}

//Metodo de testing unitario de setCookie
var testSetCookie = function(name, value) {
    setCookie(name, value);
    var ca = document.cookie.split(";");
    var cookie = ca[0].split("=");
    var cookie_name = cookie[0];
    var cookie_value = cookie[1];
    if (!cookie_name.includes(name) || !cookie_value.includes(value)) {
        setCookie(name,"",-1);
        return "setCookie function returning errors."
    }
    setCookie(name,"",-1);
    return null;
    
}

//Metodo de testing unitario de getCookie
var testGetCookie = function(name) {
    document.cookie = name + "= 1 ;" ;
    var cookie = getCookie(name);
    if(cookie===null) {
        return "getCookie function not finding value of cookie when name is passed"
    }
   if(cookie.includes(1)) {

    }
}

//Metodo de testing unitario de dropCookie
var testDropCookie = function() {
    
}

//Metodo de testing unitario de la Libreria
function testLibrary() {
    var testParseJsonStringResults = testParseJsonString();
    var testSetCookieResults = testSetCookie();
    var testGetCookieResults = testGetCookie();
    var testDropCookieResults = testDropCookie();

    if (testSetCookieResults!==null) {
        return "Error encountered in function setCookie: " + testSetCookieResults;
    }

    if (testGetCookieResults!==null) {
        return "Error encountered in function getCookie: " + testGetCookiegResults;
    }

    if(testDropCookieResults!==null) {
        return "Error encountered in function dropCookie: " + testDropCookiegResults;
    }
    
    if (testParseJsonStringResults!==null) {
        return "Error encountered in function parsejsonstring: " + testParseJsonStringResults;
    }
    return null;
}