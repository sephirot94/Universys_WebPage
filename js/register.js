//Esta clase implementa la funcionalidad del registro en Javascript. Utilizable en cualquier ABM

document.getElementById("submit").onclick = function() { registerSubmit() };

//Esta funcion muestra el error cuando la clase no esta implementada
function RegisterControllerBase()
{
    var register = function(json)
    {
        alert("registerControllerBase::register(json) ERROR: Base class, not implemented");
    };
}

//Esta funcion es de uso de testeo solamente. No debe ser implementada en ambiente de produccion

function RegisterControllerLocal(RegisterControllerBase)
{
    var register = function(json)
    {   

    };
}

//Esta funcion envia los datos del formulario de registro al servidor para ser procesados.
//Ante la respuesta del servidor, envia el codigo de respuesta a la clase utility para redireccionar, y el codigo de
//Exito o error de la operacion

function RegisterControllerRemote(RegisterControllerBase)
{
    var register = function(json)
    {
        var username = document.getElementById(userField).value;
        var password = document.getElementById(passField).value;

        $.ajax();
    };
}

var registerController = new registerControllerLocal();

function registerSubmit(){
    registerController.register("{'nombre':'Juan'}");
}

