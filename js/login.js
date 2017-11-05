//Este archivo implementa la funcionalidad del login en Javascript.

//Llamada al metodo de submit
document.getElementById("submit").onclick = function() { loginSubmit() };

//Esta funcion muestra el error cuando la clase no esta implementada
function LoginControllerBase()
{
    var login = function(userField, passField)
    {
        alert("LoginControllerBase::login(userField, passField) ERROR: Base class, not implemented");
    };
}

//Esta funcion es de uso de testeo solamente. No debe ser implementada en ambiente de produccion
function LoginControllerLocal(LoginControllerBase)
{
    var loginLogic = function(username, password)
    {
        if(username=="admin@admin.com" && pass=="admin") {
            return '{ "api-version" : "1.0", "error-code" : "200", “usuario” : { \
                “nombre” : ”Diego”,\
                “apellido” : “Maradona”,\
                “fNac” : “3/8/01”\
                “tipo” : “alumno”\
                }\
        }';
        }
        if(pass=="admin" && username!="admin@admin.com") {
            return '{ "api-version" : "1.0", "error-code" : "680" }';
        }
        if(pass!="admin" && username=="admin@admin.com") {
            return '{ "api-version" : "1.0", "error-code" : "777" }';
        }
        
        return '{ "api-version" : "1.0", "error-code" : "800" }';
    }

    var login = function(userField, passField)
    {
        return this.loginLogic(document.getElementById(userField).value, document.getElementById(passField).value);
    };

    var logout = function () {
        
    }
}

//Esta funcion envia los datos del formulario de login al servidor para ser procesados.
//Ante la respuesta del servidor, envia el codigo de respuesta a la clase utility para redireccionar.
function LoginControllerRemote(LoginControllerBase)
{
    //logica del login. Este metodo realiza el request a la API y maneja la respuesta
    var loginLogic = function(username, password)
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
    var login = function(userField, passField)
    {
        this.loginLogic(document.getElementById(userField).value, document.getElementById(passField).value);
    };

    //Este metodo se usa para cerrar sesion
    var logout = function() {
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
var loginController = new LoginControllerLocal();

//Metodo para submit de datos
function loginSubmit() {
    loginController.login("username", "password");
}

//Metodo de test unitario de la clase Login
function testLogin() {
    var lc = new LoginControllerLocal();

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

    return true;
}