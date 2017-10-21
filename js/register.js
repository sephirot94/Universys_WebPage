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
                "catedra" : "Didier",\
                "carrera" : "Programacion",\
                "materia" : "Proyecto", \
                "horario" : "19:00hs", \
                "tipoDeClase" : "teorico", \
                "claveDeClase" : "30",\
                "alumno" : "ivan",\
                "nota" : "4"\ 
            }"\
        }';
        }

        if (flag=="fichadas") {
            return '{ "api-version" : "1.0", "error-code" : "200",\ 
            "usuario": "{\
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
        //mapa con el flag como clave y la variacion de la url como valor
        var mapa_url = {
            usuario : "ABMUsuarios",
            catedra : "ABMCatedra",
            materia : "ABMMateria",
            notas : "ABMNotas",
            fichadas : "ABMFichadas",
            carrera : "ABMCarrera"
        };

        //recorro el mapa buscando la clave que sea igual al flag ingresado
        for(var key in mapa_url) {
            if(key==flag) {
                var url = mapa_url[key];
            }
        }

        //envio por ajax a la url armada por el valor traido del mapa
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

//Metodo de testing unitario
function testRegister() {
    var rc = new RegisterControllerLocal();

    var json = parsejsonstring(rc.register("usuario"));

    if(json.usuario.nombre != "Gaston" || json.usuario.apellido != "Bodeman" || json.usuario.fnac != "20/09/1994" || json.usuario.genero != "masculino" || json.usuario.domicilio != "blanco encalada 4892" || json.usuario.telefono != "45228786" || json.usuario.matricula != "03140" || json.usuario.mail != "pepito@gmail.com") {
        return "testLogin has ERRORS: loginLogic not returning the right value. Register: Usuario";
    }

    if(json.notas.catedra != "Didier" || json.notas.carrera != "Programacion" || json.notas.materia != "Proyecto" || json.notas.horario != "19:00hs" || json.notas.tipoDeClase != "teorico" || json.notas.claveDeClase != "30" || json.notas.alumno != "ivan" || json.notas.nota != "4") {
        return "testLogin has ERRORS: loginLogic not returning the right value. Register: Notas";
    }
}

