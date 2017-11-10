//Esta clase implementa la funcionalidad del reseteo de contraseña en Javascript. 

document.getElementById("submit").onclick = function() { restablecerContrasenaSubmit() };

//Esta funcion muestra el error cuando la clase no esta implementada
function restablecerContrasenaControllerBase()
{
    var restablecerContrasena = function()
    {
        alert("restablecerContrasenaControllerBase::restablecerContrasena(link_recuperacion) ERROR: Base class, not implemented");
    };
}

//Esta funcion es de uso de testeo solamente. No debe ser implementada en ambiente de produccion

function restablecerContrasenaControllerLocal(restablecerContrasenaControllerBase)
{
    var restablecerContrasena = function(flag)
    {   
        if (flag=="mail") {
            var json = 
            {
                "mail" : "pepito@gmail.com"
            };
        }
        if(flag=="pregunta") {
            var json = 
            {
                "pregunta" : "Cual es la mejor banda de la historia?"
            };
        }

        return json;
    };

    var restablecerRespuesta = function (flag) {
        if (flag=="respuesta") {
            var json = 
            {
                "respuesta" : "Rush"
            };
        }
        if(flag=="password") {
            var json = 
            {
                "new_password" : "NewPassword1234"
            };
        }

        return json;
    }

    //Metodo de uso para testeo local, devuelve el JSON con las preguntas secretas que hay en servidor
    var getPreguntas = function() {
        var json = {
            "pregunta1" : "Cual es tu color favorito?",
            "pregunta2" : "Como se llama tu hermano?",
            "pregunta3" : "Cual es el mejor equipo de futbol?",
            "pregunta4" : "Cual es tu banda favorita?",
            "pregunta5" : "Cual es tu comida favorita?",
        };
        return json;
    }
}

//Esta funcion envia los datos del formulario de registro al servidor para ser procesados.

function restablecerContrasenaControllerRemote(restablecerContrasenaControllerBase)
{
    var poblarPreguntas = function (json) {
        var pregunta = Document.getElementById("pregunta");
        for (var i = 0; i<json.preguntas.length; i++){
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = json.preguntas[i];
            pregunta.appendChild(opt);
        }
    }

    var restablecerContrasena = function()
    {
        //me fijo si el usuario ingresa mediante el link enviado por backend
        var pregunta = Document.getElementById("#pregunta").value();
        var respuesta = Document.getElementById("#respuesta").value();
        var new_pass = Document.getElementById("#new_pass").value();
        var confirm_pass = Document.getElementById("confirm_pass").value();
        if(new_pass==confirm_pass) {
            $.ajax({
                url: "http://universys.site/RecuperarContrasena",
                type: 'POST',
                data: {
                    "apiVer" : "1.0",
                    "idSesion" : getCookie("idSesion"),
                    "pregunta" : pregunta
                    "respuesta" : respuesta
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
    };

    //Este metodo permite cambiar la contraseña o la respuesta secreta una vez ya logueado.
    var cambiarContrasena = function() {
        var pregunta = Document.getElementById("#pregunta");
        //Busco la option del select elegida
        var pregunta_elegida = pregunta.options[ pregunta.selectedIndex ].value();
        var respuesta = Document.getElementById("#respuesta").value();
        var new_pass = Document.getElementById("#new_pass").value();
        var confirm_pass = Document.getElementById("confirm_pass").value();
        if(new_pass==confirm_pass) {
            $.ajax({
                url: "http://universys.site/RecuperarContrasena",
                type: 'POST',
                data: {
                    "apiVer" : "1.0",
                    "idSesion" : getCookie("idSesion")
                    "pregunta" : pregunta_elegida,
                    "respuesta" : respuesta,
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

    //Este metodo se usa para traer las preguntas secretas posibles y desplegarlas en un select
    var getPreguntas = function() {
        $.ajax({
            url: "http://universys.site/RecuperarContrasena",
            type: 'GET',
            success : function(result) {
                poblarPreguntas(parsejsonstring(result));
            },
            error: function(result) {
                alert("Hubo un error: " + result.error-code);
            } 
        });
    }
}

var restablecerContrasenaController = new restablecerContrasenaControllerRemote();

function restablecerContrasenaSubmit(){
    
    restablecerContrasenaController.restablecerContrasena(link_recuperacion);
}

//Metodo de testing unitario
function testRestablecerContrasena() {
   var instance = new restablecerContrasenaControllerLocal();

   var json = instance.restablecerContrasena("mail");

   if (json.mail!="pepito@gmail.com") {
     return "testRestablecerContraseña has ERRORS: restablecerContraseña not sending the right value: mail";
   }

   if (json.password!="NuevaContrasena1234") {
    return "testRestablecerContraseña has ERRORS: restablecerContraseña not returning the right value: password";
  }

  return null;
}