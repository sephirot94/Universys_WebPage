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

function RegisterControllerRemote(RegisterControllerBase)
{
    var register = function(json)
    {

        $.ajax({
            url: "ACA VA LA URL DEL SERVIDOR",
            type: 'POST',
            data: json,
            success : function(result) {
                // limpiar el formulario
                document.getElementsByClassName("empty").reset();
            },
            error: function(result) {
                alert("Hubo un error: " + result.error-code);
            } 
        });
    };
}

var registerController = new registerControllerLocal();

function registerSubmit(){
    registerController.register("{'nombre':'Juan'}");
}

