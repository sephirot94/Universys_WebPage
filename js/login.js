//Este archivo implementa la funcionalidad del login en Javascript.

//Esta funcion muestra el error cuando la clase no esta implementada
// function LoginControllerBase()
// {
//     var login = function(userField, passField)
//     {
//         alert("LoginControllerBase::login(userField, passField) ERROR: Base class, not implemented");
//     };
// }

//Esta funcion es de uso de testeo solamente. No debe ser implementada en ambiente de produccion
class LoginControllerLocal
{
    constructor() {}
    loginLogic (username, pass)
    {
        alert(username);
        alert(pass);
        if(username=="admin@admin.com" && pass=="Admin1234") {
            return '{ "api-version" : "1.0", "error-code" : "200", “usuario” : { \
                "nombre" : "Diego",\
                "apellido" : "Maradona",\
                "idSesion" : 1234,\
                "rol" : "administrador"\
                }\
        }';
        }
        if(pass=="Admin1234" && username!="admin@admin.com") {
            return '{ "api-version" : "1.0", "error-code" : "680" }';
        }
        if(pass!="Admin1234" && username=="admin@admin.com") {
            return '{ "api-version" : "1.0", "error-code" : "777" }';
        }
        
        return '{ "api-version" : "1.0", "error-code" : "800" }';
    }

    login (userField, passField)
    {
        var login = parseJsonString(this.loginLogic(document.getElementById(userField).value, document.getElementById(passField).value));
        console.log(login);
        setCookie("idSesion", login.usuario.idSesion);
        if (login.usuario.rol=="administrador") {
            window.location.href = '../html/perfilAdministrador.html';
        }
        if (login.usuario.rol=="alumno") {
            window.location.href = '../html/perfilAlumno.html';
        }
        if (login.usuario.rol=="profesor") {
            window.location.href = '../html/perfilProfesor.html';
        }
    };

    logout () {
        dropCookie("idSesion");
        window.location.href = '../html/login.html';
    }
}

//Esta funcion envia los datos del formulario de login al servidor para ser procesados.
//Ante la respuesta del servidor, envia el codigo de respuesta a la clase utility para redireccionar.
class LoginControllerRemote
{
    //logica del login. Este metodo realiza el request a la API y maneja la respuesta
    loginLogic (username, password)
    {
        $.ajax({
            url: "http://universys.site/login",
            type: 'POST',
            data: {
                "apiVer" : "1.0",
                "mail" : username,
                "password" : password
            },
            success : function(result) {
                var rol = result.rol;
                setCookie("idSesion", result.idSesion)
                if (rol=="administrador") {
                    window.location.href = '../html/perfilAdministrador.html';   
                }
                if (rol=="alumno") {
                    window.location.href = '../html/perfilAlumno.html';   
                }
                if (rol=="profesor") {
                    window.location.href = '../html/perfilProfesor.html';   
                }               
            },
            error: function(result) {
                alert("Hubo un error: " + result.error-code);
            } 
        });
    };

    //Este metodo llama al metodo anterior, efectuando la request a la API.
    login (userField, passField)
    {
        this.loginLogic(document.getElementById(userField).value, document.getElementById(passField).value);
    };

    //Este metodo se usa para cerrar sesion
    logout () {
        var idSesion = getCookie("idSesion");
        $.ajax({
            url: "http://universys.site/logout",
            type: 'POST',
            data: {
                "apiVer" : "1.0",
                "idSesion" : idSesion
            },
            success : function(result) {
                dropCookie("idSesion");
                window.location.href = '../html/home.html';
            },
            error: function(result) {
                alert("Hubo un error: " + result.error-code);
            } 
        });

    }
}

//Instanciamos el Controlador
var loginController = new LoginControllerLocal;

//Metodo para submit de datos
function loginSubmit() {
    loginController.login("username", "password");
}

//Metodo de test unitario de la clase Login
function testLogin() {
    var lc = new LoginControllerLocal;

    var json = parsejsonstring(lc.loginLogic("admin@admin.com", "admin"));

    if(json.usuario.apellido != "Maradona" || json.usuario.nombre != "Diego" || json.usuario.fNac != "3/8/01" || json.usuario.tipo != "alumno" )
    {
        return "testLogin has ERRORS: loginLogic not returning the right value";
    }

    var json = parsejsonstring(lc.loginLogic("admin@admin.com", "admin"));

    json = parsejsonstring(lc.loginLogic("riverkpo99@altorancho.com", "libertadores2015"));

    if(json.error-code == "200")
    {
        return "testLogin has ERRORS: stating success when it should be failing";
    }

    json = parsejsonstring(lc.logicLogic("admin@admin.com", "libertadores2015"));

    if(json.error-code != "777")
    {
        return "testLogin has ERRORS: receiving wrong error code";
    }

    json = parsejsonstring(lc.logicLogic("riverkpo99@altorancho.com", "admin"));
    
    if(json.error-code != "680")
    {
        return "testLogin has ERRORS: receiving wrong error code";
    }

    return null;
}