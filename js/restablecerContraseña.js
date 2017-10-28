//Esta clase implementa la funcionalidad del reseteo de contraseña en Javascript. 

document.getElementById("submit").onclick = function() { restablecerContraseñaSubmit() };

//Esta funcion muestra el error cuando la clase no esta implementada
function restablecerContraseñaControllerBase()
{
    var restablecerContraseña = function(new_pass,confirm_pass)
    {
        alert("restablecerContraseñaControllerBase::restablecerContraseña(new_pass,confirm_pass) ERROR: Base class, not implemented");
    };
}

//Esta funcion es de uso de testeo solamente. No debe ser implementada en ambiente de produccion

function restablecerContraseñaControllerLocal(restablecerContraseñaControllerBase)
{
    var restablecerContraseña = function(new_pass,confirm_pass, flag)
    {   
        if (flag=="mail") {
            var json = 
            {
                "mail" : "pepito@gmail.com"
            };
        }
        if(flag=="password") {
            var json = 
            {
                "password" : "NuevaContrasena1234"
            };
        }

        if(flag=="invalid_mail") {
            var json = 
            {
                "mail" : "pepito"
            };
        }

        if(flag=="invalid_password") {
            var json = 
            {
                "password" : "pass1234"
            };
        }
        return json;
    };
}

//Esta funcion envia los datos del formulario de registro al servidor para ser procesados.

function restablecerContraseñaControllerRemote(restablecerContraseñaControllerBase)
{
    var restablecerContraseña = function(new_pass,confirm_pass)
    {
        //me fijo si el usuario ingresa mediante el link enviado por backend
        var link_recuperacion = true; 
        if(link_recuperacion) {
            var new_pass = Document.getElementById("#new_pass").value();
            var confirm_pass = Document.getElementById("confirm_pass").value();
            if(new_pass==confirm_pass) {
                $.ajax({
                    url: "http://universys.site/RecuperarContraseña",
                    type: 'POST',
                    data: {
                        "password" : new_pass
                    },
                    success : function(result) {
                        window.location.href = '../html/home.html';
                    },
                    error: function(result) {
                        alert("Hubo un error: " + result.error-code);
                    } 
                });
            }
            else {
                alert("Las contraseñas ingresadas no coinciden. Por favor, la confirmacion de contraseña debe ser igual a la nueva contraseña");
            }
        }
        // Si no se envio el mail al usuario, le envio la direccion de correo de este
        // para que backend le mande el link de recuperacion de contrasena por mail.
        else {
            var mail = Document.getElementById("mail").value();
            $.ajax({
                url: "http://universys.site/RecuperarContraseña",
                type: 'POST',
                data: {
                    "mail" : mail
                },
                success : function(result) {
                    window.location.href = '../html/home.html';
                },
                error: function(result) {
                    alert("Hubo un error: " + result.error-code);
                } 
            });
        }
    
    };
}

var restablecerContraseñaController = new restablecerContraseñaControllerLocal();

function restablecerContraseñaSubmit(){
    restablecerContraseñaController.restablecerContraseña();
}

//Metodo de testing unitario
function testRestablecerContraseña() {
   
}