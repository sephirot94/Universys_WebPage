document.getElementById("submit").onclick = function() { loginSubmit() };

function LoginControllerBase()
{
    var login = function(userField, passField)
    {
        alert("LoginControllerBase::login(userField, passField) ERROR: Base class, not implemented");
    };
}

function LoginControllerLocal(LoginControllerBase)
{
    var login = function(userField, passField)
    {   
        var username = document.getElementById(userField).value;   
        var password = document.getElementById(passField).value;

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
        else {
            return '{ "api-version" : "1.0", "error-code" : "800" }';
        }
    };
}

function LoginControllerRemote(LoginControllerBase)
{
    var login = function(userField, passField)
    {
        var username = document.getElementById(userField).value;
        var password = document.getElementById(passField).value;

        $.ajax();
    };
}

var loginController = new LoginControllerLocal();

function loginSubmit(){
    loginController.login("username", "password");
}

