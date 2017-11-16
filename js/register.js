//Esta clase implementa la funcionalidad del registro en Javascript. Utilizable en cualquier ABM
$("#submit").click(function registerSubmit() { });
// document.getElementById("submit").onclick = function(registerSubmit);

//Esta funcion muestra el error cuando la clase no esta implementada
function RegisterControllerBase()
{
    var register = function(json)
    {
        alert("registerControllerBase::register(json) ERROR: Base class, not implemented");
    };
}

//Esta funcion es de uso de testeo solamente. No debe ser implementada en ambiente de produccion

class RegisterControllerLocal
{
    constructor()
    {
        //JSON de mails mock 
        this.jsonMail = {
            "mails" : 
            [
                {
                    "id" : 1,
                    "mail" : "ivan.jinkus@comunidad.ub.edu.ar"
                },
                {
                    "id" : 2,
                    "mail" : "pepito@gmail.com"
                },
                {
                    "id" : 3,
                    "mail" : "masoneriacubana@gmail.com"
                }
            ]
        };

        //JSON de Catedras mock
        this.jsonCatedras = {
            "catedras" : 
            [
                {
                    "id" : 1,
                    "catedra" :  "Didier"
                },
                {
                    "id" : 2,
                    "catedra" :  "Greiner"
                },
                {
                    "id" : 3,
                    "catedra" : "Aldegani"
                }
            ]
        };

        //JSON de Materias mock
        this.jsonMaterias = {
            "materias" : 
            [
                {
                    "id" : 1,
                    "materia" : "Proyecto de Construccion de Software"
                } ,
                {
                    "id":2,
                    "materia" : "Seguridad Informatica"
                },
                {
                    "id" : 3 ,
                    "materia" : "Base de Datos"
                }
            ]
        };

        //JSON de Carreras mock
        this.jsonCarreras = {
                "carreras" : 
                [
                    {
                        "id" : 1,
                        "carrera" : "Programacion"
                    } ,
                    {
                        "id":2,
                        "carrera" : "Ingenieria en Robotica"
                    },
                    {
                        "id" : 3 ,
                        "carrera" : "Abogacia"
                    }
                ]
            };

        //JSON de Alumnos mock
        this.jsonAlumnos = {
            "alumnos" : 
            [
                {
                    "id" : 1,
                    "nombre" : "Ivan Jinkus"
                } ,
                {
                    "id":2,
                    "nombre" : "Ignacio Tarallo"
                },
                {
                    "id" : 3 ,
                    "nombre" : "Andres Blanco"
                }
            ]
        };

    }

    //Metodo para armar los JSON mock que se necesitan para demostrar el funcionamiento del sitio y para testing unitario
    armarJson (flag)
    {   
        //JSON de testeo: Usuario
        if (flag=="usuario") {
            return {
                "api-version" : "1.0", 
                "error-code" : "200",
                "usuario": 
                {
                    "nombre" : "Gaston",
                    "apellido" : "Bodeman",
                    "fnac" : "20/09/1994",
                    "genero" : "masculino",
                    "domicilio" : "blanco encalada 4892",
                    "telefono" : "45228786",
                    "matrícula" : "03140",
                    "mail" : "pepito@gmail.com"
                }
            }  
        };

        //JSON de testeo: Notas
        if (flag =="notas") {
            return { 
                "api-version" : "1.0", 
                "error-code" : "200", 
                "notas" : 
                {
                    "catedra" : "Didier",
                    "carrera" : "Programacion",
                    "materia" : "Proyecto", 
                    "horario" : "19:00hs", 
                    "tipoDeClase" : "teorico",
                    "claveDeClase" : "30",
                    "alumno" : "ivan",
                    "nota" : "4"
                }
            };
        }

        //JSON de testeo: fichadas
        if (flag=="fichadas") {
            return { 
                "api-version" : "1.0", 
                "error-code" : "200",
                "fichada": 
                {
                    "catedra" : "Didier",
                    "carrera" : "Programacion",
                    "materia" : "Proyecto",
                    "horario" : "19:00hs",
                    "tipoDeClase" : "teorico",
                    "claveDeClase" : "30",
                    "alumnos" : [
                                    {
                                        "nombre" : "ivan",
                                        "presente" : true
                                    }
                                ]
                }
            };
        }

        //JSON de testeo: Catedras
        if (flag=="catedras") {
            return { 
                "api-version" : "1.0", 
                "error-code" : "200", 
                "catedra": {
                    "catedra" : "Didier",
                    "nombre" : "Proyecto",
                    "titularDeCatedra" : "Didier",
                    "ofertaHoraria" : "2AB",
                }
            };
        }

        //JSON de testeo : Carreras
        if (flag=="carreras") {
            return { 
                "api-version" : "1.0",
                 "error-code" : "200", 
                "carreras": {		
                    "id_carrera" : "1",
                    "carrera" : "Programacion"
                }
            };
        }

        //JSON de testeo: Materias
        if (flag=="materias") {
            return { 
                "api-version" : "1.0", 
                "error-code" : "200", 
                "materia": {
                    "catedra" : "Didier",
                    "carrera" : "Programacion",
                    "materia" : "Proyecto",
                }
            };
        }

        //JSON de testeo: Usuario valores vacios
        if (flag=="vacio") {
            return { 
                "api-version" : "1.0",
                "error-code" : "200",
                "usuario": 
                {
                    "nombre" : "Gaston",
                    "apellido" : "",
                    "fnac" : "20/09/1994",
                    "genero" : "masculino",
                    "domicilio" : "blanco encalada 4892",
                    "telefono" : "45228786",
                    "matrícula" : "",
                    "mail" : "pepito@gmail.com"
                }
            };
        }
        
    };
}

//Esta funcion envia los datos del formulario de registro al servidor para ser procesados.

class RegisterControllerRemote
{
    //Este metodo arma el json para enviar a backend dependiendo del tipo de dato que se quiere enviar
    armarJson (flag, operacion) {
        var json;
        switch (flag) {
            case "usuario":
                json = {
                    "apiVer" : "1.0",
                    "idSesion" : getCookie("idSesion"),
                    "operacion" : operacion,
                    "nombre" : document.getElementById("nombre").value,
                    "apellido" : document.getElementById("apellido").value,
                    "documento" : document.getElementById("documento").value,
                    "fnac" : document.getElementById("fnac").value,
                    "genero" : document.getElementById("genero").value,
                    "domicilio" : document.getElementById("domicilio").value,
                    "telefono" : document.getElementById("telefono").value,
                    "identificador" : document.getElementById("matricula").value,
                    "mail" : document.getElementById("mail").value,
                    "rol" : document.getElementById("rol"),
                    "contrasena" : document.getElementById("pass").value
                };
                break;

            case "notas":
                json = {
                    "apiVer" : "1.0",
                    "idSesion" : getCookie("idSesion"),
                    "operacion" : operacion,
                    "catedra" : document.getElementById("catedra").value,
                    "carrera" : document.getElementById("carrera").value,
                    "materia" : document.getElementById("materia").value,
                    "horario" : document.getElementById("horario").value,
                    "tipoDeClase" : document.getElementById("tipoDeClase").value,
                    "claveDeClase" : document.getElementById("claveDeClase").value,
                    "alumno" : document.getElementById("alumno").value,
                    "nota" : document.getElementById("nota").value
                };
                break;
            
            case "fichadas":
                json = {
                    "apiVer" : "1.0",
                    "idSesion" : getCookie("idSesion"),
                    "operacion" : operacion,
                    "catedra" : document.getElementById("catedra").value,
                    "carrera" : document.getElementById("carrera").value,
                    "materia" : document.getElementById("materia").value,
                    "horario" : document.getElementById("horario").value,
                    "tipoDeClase" : document.getElementById("tipoDeClase").value,
                    "claveDeClase" : document.getElementById("claveDeClase").value,
                    "alumnos" : [
                                    {
                                        "nombre" : document.getElementById("nombre").value,
                                        "presente" : document.getElementById("presente").value
                                    }
                                ]
                }
                break;
            
            case "catedras":
                var dia = document.getElementById("dia");
                var hora_inicio = document.getElementById("hora_inicio");
                var hora_fin = document.getElementById("hora_fin");
                json = {
                    "apiVer" : "1.0",
                    "idSesion" : getCookie("idSesion"),
                    "operacion" : operacion,
                    "materia" : document.getElementById("materia").value,
                    "catedra" : document.getElementById("catedra").value,
                    "nombre" : document.getElementById("nombre").value,
                    "titularDeCatedra" : document.getElementById("titularDeCatedra").value,
                    "ofertaHoraria": parseOfertaHoraria(dia.options[dia.selectedIndex].value, hora_inicio.options[hora_inicio.selectedIndex].value, hora_fin.options[hora_fin.selectedIndex].value) 
                }
                break;

            case "materias" :
                json = {
                    "apiVer" : "1.0",
                    "idSesion" : getCookie("idSesion"),
                    "operacion" : operacion,
                    "catedra": document.getElementById("catedra").value,
                    "carrera" : document.getElementById("carrera").value,
                    "materia" : document.getElementById("materia").value
                }
                break;

            case "carreras" :
                if (operacion=="alta") {
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : getCookie("idSesion"),
                        "operacion" : operacion,
                        "id_carrera" : "",
                        "carrera" : document.getElementById("carrera").value
                    }
                }
                if (operacion=="modificacion") {
                    var select = document.getElementById("carrera_modificacion");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : getCookie("idSesion"),
                        "operacion" : operacion,
                        "id_carrera" : select.options[select.selectedIndex].value,
                        "carrera" : select.options[select.selectedIndex].text
                    }
                } 
                if(operacion=="baja"){
                    var select = document.getElementById("carrera_baja");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : getCookie("idSesion"),
                        "operacion" : operacion,
                        "id_carrera" : select.options[select.selectedIndex].value,
                        "carrera" : select.options[select.selectedIndex].text
                    }
                }
                break;

            default:
                alert("Error: invalid parameter. Please check value of parameter in call RegisterControllerRemote.armarJson");
                json = {
                    "error-code" : "703",
                    "error-description" : "Invalid parameter passed to armarJson method: flag. RegisterControllerRemote::armarJson(flag,operacion)"
                };
                break;
        }
        return json;
    }

    // Metodo para parsear la oferta horaria al codigo hexadecimal usado. Los parametros tienen que ser los valores hexadecimales de cada parametro (dia, hora de inicio, hora de fin)
    parseOfertaHoraria (dia, hora_inicio, hora_fin) {
        return "" + dia + hora_inicio + hora_fin + "";
    }

    register (json, flag)
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
                alert("Los datos fueron exitosamente enviados al servidor");
                document.getElementsByClassName("empty").reset();
            },
            error: function(result) {
                alert("Hubo un error: " + result.error-code);
            } 
        });
        
    
    };
}

//Metodo de testing unitario
function testRegister() {
    var rcr = new RegisterControllerRemote;
    var rc = new RegisterControllerLocal;

    var json = rc.armarJson("usuario");

    //Chequeo JSON Usuario
    if(json.usuario.nombre != "Gaston" || json.usuario.apellido != "Bodeman" || json.usuario.fnac != "20/09/1994" || json.usuario.genero != "masculino" || json.usuario.domicilio != "blanco encalada 4892" || json.usuario.telefono != "45228786" || json.usuario.matricula != "03140" || json.usuario.mail != "pepito@gmail.com") {
        return "testRegister has ERRORS: RegisterController not returning the right value RegisterController::Controller:: Usuario";
    }

    json = rc.armarJson("notas");

    //Chequeo JSON Notas
    if(json.notas.catedra != "Didier" || json.notas.carrera != "Programacion" || json.notas.materia != "Proyecto" || json.notas.horario != "19:00hs" || json.notas.tipoDeClase != "teorico" || json.notas.claveDeClase != "30" || json.notas.alumno != "ivan" || json.notas.nota != "4") {
        return "testRegister has ERRORS: RegisterController not returning the right value. RegisterController::: Notas";
    }

    json = rc.armarJson("fichadas");

    //Chequeo JSON Fichadas
    if(json.fichadas.catedra != "Didier" || json.fichadas.carrera != "Programacion" || json.fichadas.materia != "Proyecto" || json.fichadas.horario != "19:00hs" || json.fichadas.tipoDeClase != "teorico" || json.fichadas.claveDeClase != "30" || json.fichadas.alumnos[0].nombre != "ivan" || !json.fichadas.alumnos[0].presente) {
        return "testRegister has ERRORS: RegisterController not returning the right value. RegisterController::: Fichadas";
    }

    json = rc.armarJson("catedras");

    //Chequeo JSON Catedra
    if(json.catedra.catedra != "Didier" || json.catedra.nombre != "Proyecto" || json.catedra.titularDeCatedra != "Didier" || json.catedra.ofertaHoraria != "Lun-Vie, 19:00 a 23:00" ) {
        return "testRegister has ERRORS: RegisterController not returning the right value. RegisterController::: catedra";
    }

    json = rc.armarJson("materias");

    //Chequeo JSON Materia
    if(json.materia.catedra != "Didier" || json.materia.materia != "Proyecto" || json.materia.carrera != "Programacion") {
        return "testRegister has ERRORS: RegisterController not returning the right value. RegisterController::: materia";
    }

    json = rc.armarJson("vacio");
    
    //Chequeo JSON valores vacios
    if(json.usuario.nombre != "Gaston" || json.usuario.apellido == "" || json.usuario.matricula != "") {
        return "testRegister has ERRORS: RegisterController not returning the right value. RegisterController::: Empty fields: Lastname";
    }

    //Chequeo el metodo parseOfertaHoraria
    var ofertaHoraria = rcr.parseOfertaHoraria(3, 7, 9);

    if (ofertaHoraria != '379') {
        return "testRegister has ERRORS: RegisterControllerRemote.parseOfertaHoraria not returning the right value. RegisterController :: parseOfertaHoraria(dias, hora_inicio, hora_fin)";
    }

    return null;
}