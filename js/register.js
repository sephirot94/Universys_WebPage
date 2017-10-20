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
    var register = function(flag)
    {   
        if (flag=="usuario") {
            return '{ "api-version" : "1.0", "error-code" : "200",\ 
            "usuario": "{\
                “nombre” : “Gaston”,\
                “apellido” : “Bodeman”,\
                “fnac” : “20/09/1994”,\
                “genero” : “masculino”,\
                “domicilio” : “blanco encalada 4892”,\
                “telefono” : “45228786”,\
                “matrícula“ : “03140”,\
                “mail” : ”pepito@gmail.com”\
            }"\
        }';
        }

        if (flag=="notas") {
            return '{ "api-version" : "1.0", "error-code" : "200",\ 
            "notas" : "{\
                "operacion" : "modificacion",\
                "catedra" : "",\
                "carrera" : "",\
                "materia" : "", \
                "horario" : "", \
                "tipoDeClase" : "teorico", \
                "claveDeClase" : "",\
                "alumno" : "",\
                "nota" : ""\ 
            }"\
        }';
        }

        if (flag=="fichadas") {
            return '{ "api-version" : "1.0", "error-code" : "200",\ 
            "usuario": "{\
                “operación” : “modificación”,\
                “catedra” : “”,\
                “carrera” : “”,\
                “materia” : “”,\
                “horario” : “”,\
                “tipoDeClase” : “teorico”,\
                “claveDeClase” : "",\
                “alumnos” : [\
                            {“nombre” : ””,\
                            “presente” : “”}\
                    ]\
            }"\
        }';
        }

        if (flag=="catedras") {
            return '{ "api-version" : "1.0", "error-code" : "200",\ 
            "catedra": "{\
                “operación” : “”,\
                “catedra” : “”,\
                “nombre” : “”,\
                “titularDeCatedra” :””,\
                “ofertaHoraria” : “”,\
            }"\
        }';
        }

        if (flag=="materias") {
            return '{ "api-version" : "1.0", "error-code" : "200",\ 
            "materia": "{\
                “operación” : “”,\	
                “catedra” : “”,\
                “carrera” : "",\
                “materia” : “”,\
            }"\
        }';
        }
        
    };
}

//Esta funcion envia los datos del formulario de registro al servidor para ser procesados.

function RegisterControllerRemote(RegisterControllerBase)
{
    var register = function(json, flag)
    {
        var mapa_url = {
            usuario : "ABMUsuarios",
            catedra : "ABMCatedra",
            materia : "ABMMateria",
            notas : "ABMNotas",
            fichadas : "ABMFichadas",
            carrera : "ABMCarrera"
        };
        
        for(var key in mapa_url) {
            if(key==flag) {
                var url = mapa_url[key];
            }
        }

        $.ajax({
            url: "http://universys.site/" + url,
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

