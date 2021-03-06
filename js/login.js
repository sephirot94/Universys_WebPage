//Este archivo implementa la funcionalidad del login en Javascript.

//Esta funcion es de uso de testeo solamente. No debe ser implementada en ambiente de produccion
class LoginControllerLocal
{
    constructor() {}
    loginLogic (username, pass)
    {
        if(username=="admin@admin.com" && pass=="Admin1234") {
            return {
                "api-version": "1.0",
                "error_code": "200",
                "usuario": {
                   "nombre": "Diego",
                   "apellido": "Maradona",
                   "idSesion": "1234",
                   "rol": "administrador"
                }
             };
        }
        if(pass=="Admin1234" && username!="admin@admin.com") {
            return { "api-version" : "1.0", "error_code" : "680" };
        }
        if(pass!="Admin1234" && username=="admin@admin.com") {
            return { "api-version" : "1.0", "error_code" : "777" };
        }
        
        return { "api-version" : "1.0", "error_code" : "800" };
    }

    //Este metodo ejecuta el Login Mockeado
    login (userField, passField)
    {
        var json = this.loginLogic(document.getElementById(userField).value, document.getElementById(passField).value);
        if (json.error_code!=200) {
            alert("Las credenciales ingresadas son incorrectas");
        }
        // setCookie("idSesion", json.usuario.idSesion);
        if (json.usuario.rol=="administrador") {
            window.location.href = 'perfilAdministrador.html';
        }
        else if (json.usuario.rol=="alumno") {
            window.location.href = 'perfilAlumno.html';
        }
        else if (json.usuario.rol=="profesor") {
            window.location.href = 'perfilProfesor.html';
        }
        else {
            console.log("Error");
        }
    };

    //Este metodo ejecuta el logout Mockeado
    logout () {
        // dropCookie("idSesion");
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
                alert("Hubo un error: " + result.error_code);
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
                alert("Hubo un error: " + result.error_code);
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
    
    var json = lc.loginLogic("admin@admin.com", "Admin1234");

    if(json.usuario.apellido != "Maradona" || json.usuario.nombre != "Diego" || json.usuario.rol != "administrador" || json.usuario.idSesion != "1234" || json.error_code != "200")
    {
        return "testLogin has ERRORS: loginLogic not returning the right value";
    }

    json = lc.loginLogic("riverkpo99@altorancho.com", "libertadores2015");

    if(json.error_code == "200")
    {
        return "testLogin has ERRORS: stating success when it should be failing";
    }

    json = lc.loginLogic("admin@admin.com", "libertadores2015");

    if(json.error_code != "777")
    {
        return "testLogin has ERRORS: receiving wrong error code";
    }

    json = lc.loginLogic("riverkpo99@altorancho.com", "Admin1234");
    
    if(json.error_code != "680")
    {
        return "testLogin has ERRORS: receiving wrong error code";
    }

    return null;
}