//Esta clase implementa la funcionalidad del registro en Javascript. Utilizable en cualquier ABM

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
                    "matricula" : "03140",
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
                    "matricula" : "",
                    "mail" : "pepito@gmail.com"
                }
            };
        }
        
    };
}

//Clase de ABM con implementacion de API.
class RegisterControllerRemote
{
    //Este metodo arma el json para enviar a backend dependiendo del tipo de dato que se quiere enviar
    armarJson (flag, operacion) {
        var json;
        switch (flag) {
            //Arma JSON usuarios.
            case "usuario":
                if (operacion=="alta") {
                    var select_rol = document.getElementById("rol_alta");
                    var select_genero = document.getElementById("genero_alta");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "",  
                        "operacion" : operacion,
                        "nombre" : document.getElementById("nombre_alta").value,
                        "apellido" : document.getElementById("apellido_alta").value,
                        "documento" : document.getElementById("documento_alta").value,
                        "fnac" : document.getElementById("fnac_alta").value,
                        "genero" : select_genero.options[select_genero.selectedIndex].value,
                        "domicilio" : document.getElementById("domicilio_alta").value,
                        "telefono" : document.getElementById("telefono_alta").value,
                        "identificador" : document.getElementById("matricula_alta").value,
                        "mail" : document.getElementById("mail_alta").value,
                        "rol" : select_rol.options[select_rol.selectedIndex].value,
                        "contrasena" : document.getElementById("pass_alta").value
                    };
                }
                if (operacion=="baja") {
                    var select_mail = document.getElementById("mail_baja");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "nombre" : "",
                        "apellido" : "",
                        "documento" : "",
                        "fnac" : "",
                        "genero" : "",
                        "domicilio" : "",
                        "telefono" : "",
                        "identificador" : select_mail.options[select_mail.selectedIndex].value,
                        "mail" : select_mail.options[select_mail.selectedIndex].text,
                        "rol" : "",
                        "contrasena" : ""
                    };
                }
                if (operacion=="modificacion") {
                    var select_rol = document.getElementById("rol_modificacion");
                    var select_genero = document.getElementById("genero_modificacion");
                    var select_mail = document.getElementById("mail_modificacion");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "nombre" : document.getElementById("nombre_modificacion").value,
                        "apellido" : document.getElementById("apellido_modificacion").value,
                        "documento" : document.getElementById("documento_modificacion").value,
                        "fnac" : document.getElementById("fnac_modificacion").value,
                        "genero" : select_genero.options[select_genero.selectedIndex].value,
                        "domicilio" : document.getElementById("domicilio_modificacion").value,
                        "telefono" : document.getElementById("telefono_modificacion").value,
                        "identificador" : select_mail.options[select_mail.selectedIndex].value,
                        "mail" : select_mail.options[select_mail.selectedIndex].text,
                        "rol" : select_rol.options[select_rol.selectedIndex].value,
                        "contrasena" : document.getElementById("pass_modificacion").value
                    };
                }
                break;
            
            // Arma JSON notas
            case "notas":
                if (operacion=="alta") {
                    var select_alumnos = document.getElementById("alumnos_alta");
                    var select_catedras = document.getElementById("catedra_alta");
                    var select_carreras = document.getElementById("carrera_alta");
                    var select_materias = document.getElementById("materia_alta");
                    var select_notas = document.getElementById("nota_alta");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "catedra" : select_catedras.options[select_catedras.selectedIndex].text,
                        "carrera" : select_carreras.options[select_carreras.selectedIndex].text,
                        "materia" : select_materias.options[select_materias.selectedIndex].text,
                        "alumno" : select_alumnos.options[select_alumnos.selectedIndex].text,
                        "nota" : select_notas.options[select_notas.selectedIndex].value
                    };
                }
                if (operacion=="baja") {
                    var select_alumnos = document.getElementById("alumnos_baja");
                    var select_catedras = document.getElementById("catedra_baja");
                    var select_carreras = document.getElementById("carrera_baja");
                    var select_materias = document.getElementById("materia_baja");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "catedra" : select_catedras.options[select_catedras.selectedIndex].text,
                        "carrera" : select_carreras.options[select_carreras.selectedIndex].text,
                        "materia" : select_materias.options[select_materias.selectedIndex].text,
                        "alumno" : select_alumnos.options[select_alumnos.selectedIndex].text,
                        "nota" : "",
                    };
                }
                if (operacion=="modificacion") {
                    var select_alumnos = document.getElementById("alumnos_modificacion");
                    var select_catedras = document.getElementById("catedra_modificacion");
                    var select_carreras = document.getElementById("carrera_modificacion");
                    var select_materias = document.getElementById("materia_modificacion");
                    var select_notas = document.getElementById("nota_modificacion");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "catedra" : select_catedras.options[select_catedras.selectedIndex].text,
                        "carrera" : select_carreras.options[select_carreras.selectedIndex].text,
                        "materia" : select_materias.options[select_materias.selectedIndex].text,
                        "alumno" : select_alumnos.options[select_alumnos.selectedIndex].text,
                        "nota" : select_notas.options[select_notas.selectedIndex].value
                    };
                }
                break;
            
            //Arma JSON fichadas
            case "fichadas":
                if (operacion=="alta") {
                    var select_alumnos = document.getElementById("alumnos_alta");
                    var select_catedras = document.getElementById("catedra_alta");
                    var select_carreras = document.getElementById("carrera_alta");
                    var select_materias = document.getElementById("materia_alta");
                    var select_dia = document.getElementById("dia_alta");
                    var select_horario = document.getElementById("horario_alta");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "catedra" : select_catedras.options[select_catedras.selectedIndex].text,
                        "carrera" : select_carreras.options[select_carreras.selectedIndex].text,
                        "materia" : select_materias.options[select_materias.selectedIndex].text,
                        "horario" : this.parseOfertaHoraria(select_dia.options[select_dia.selectedIndex].value, select_horario.options[select_horario.selectedIndex].value, "" ),
                        "alumnos" : [
                                        {
                                            "nombre" : select_alumnos.options[select_alumnos.selectedIndex].text,
                                            "presente" : document.getElementById("presente").value
                                        }
                                    ]
                    };
                }
                if (operacion=="baja") {
                    var select_alumnos = document.getElementById("alumno_baja");
                    var select_catedras = document.getElementById("catedra_baja");
                    var select_carreras = document.getElementById("carrera_baja");
                    var select_materias = document.getElementById("materia_baja");
                    var select_dia = document.getElementById("dia_baja");
                    var select_horario = document.getElementById("horario_baja");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "catedra" : select_catedras.options[select_catedras.selectedIndex].text,
                        "carrera" : select_carreras.options[select_carreras.selectedIndex].text,
                        "materia" : select_materias.options[select_materias.selectedIndex].text,
                        "horario" : this.parseOfertaHoraria(select_dia.options[select_dia.selectedIndex].value, select_horario.options[select_horario.selectedIndex].value, "" ),
                        "alumnos" : [
                                        {
                                            "nombre" : select_alumnos.options[select_alumnos.selectedIndex].text,
                                            "presente" : document.getElementById("presente").value
                                        }
                                    ]
                    };
                }
                if (operacion=="modificacion") {
                    var select_alumnos = document.getElementById("alumnos_modificacion");
                    var select_catedras = document.getElementById("catedra_modificacion");
                    var select_carreras = document.getElementById("carrera_modificacion");
                    var select_materias = document.getElementById("materia_modificacion");
                    var select_dia = document.getElementById("dia_modificacion");
                    var select_horario = document.getElementById("horario_modificacion");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "catedra" : select_catedras.options[select_catedras.selectedIndex].text,
                        "carrera" : select_carreras.options[select_carreras.selectedIndex].text,
                        "materia" : select_materias.options[select_materias.selectedIndex].text,
                        "horario" : this.parseOfertaHoraria(select_dia.options[select_dia.selectedIndex].value, select_horario.options[select_horario.selectedIndex].value, "" ),
                        "alumnos" : [
                                        {
                                            "nombre" : select_alumnos.options[select_alumnos.selectedIndex].text,
                                            "presente" : document.getElementById("presente").value
                                        }
                                    ]
                    };
                }
                break;
            
            //Arma JSON Catedras
            case "catedras":
                if (operacion=="alta") {
                    var dia = document.getElementById("dia_alta");
                    var hora_inicio = document.getElementById("hora_inicio_alta");
                    var hora_fin = document.getElementById("hora_fin_alta");
                    var materia_select = document.getElementById("materia_alta");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "materia" : materia_select.options[materia_select.selectedIndex].text,
                        "catedra" : document.getElementById("catedra_alta").value,
                        "nombre" : document.getElementById("nombre_alta").value,
                        "titularDeCatedra" : document.getElementById("titularDeCatedra_alta").value,
                        "ofertaHoraria": this.parseOfertaHoraria(dia.options[dia.selectedIndex].value, hora_inicio.options[hora_inicio.selectedIndex].value, hora_fin.options[hora_fin.selectedIndex].value) 
                    };
                }
                if (operacion=="baja") {
                    var catedra_select = document.getElementById("catedra_baja");
                    var materia_select = document.getElementById("materia_baja");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "materia" : materia_select.options[materia_select.selectedIndex].text,
                        "catedra" : catedra_select.options[catedra_select.selectedIndex].text,
                        "id_catedra" : catedra_select.options[catedra_select.selectedIndex].value,
                        "nombre" : "",
                        "titularDeCatedra" : "",
                        "ofertaHoraria": ""
                    };
                }
                if (operacion=="modificacion") {
                    var dia = document.getElementById("dia_modificacion");
                    var hora_inicio = document.getElementById("hora_inicio_modificacion");
                    var hora_fin = document.getElementById("hora_fin_modificacion");
                    var catedra_select = document.getElementById("catedra_modificacion");
                    var materia_select = document.getElementById("materia_modificacion");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "materia" : materia_select.options[materia_select.selectedIndex].text,
                        "catedra" : catedra_select.options[catedra_select.selectedIndex].text,
                        "id_catedra" : catedra_select.options[catedra_select.selectedIndex].value,
                        "nombre" : document.getElementById("nombre_modificacion").value,
                        "titularDeCatedra" : document.getElementById("titularDeCatedra_modificacion").value,
                        "ofertaHoraria": this.parseOfertaHoraria(dia.options[dia.selectedIndex].value, hora_inicio.options[hora_inicio.selectedIndex].value, hora_fin.options[hora_fin.selectedIndex].value) 
                    };
                }
                break;

            //Amrar JSON Materias
            case "materias" :
                if (operacion=="alta") {
                    var select_catedra = document.getElementById("catedra_alta");
                    var select_carrera = document.getElementById("carrera_alta");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "catedra": select_catedra.options[select_catedra.selectedIndex].text,
                        "carrera" : select_carrera.options[select_carrera.selectedIndex].text,
                        "materia" : document.getElementById("materia_alta").value
                    };
                }
                if (operacion=="baja") {
                    var select = document.getElementById("materia_baja");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "catedra": "",
                        "carrera" : "",
                        "materia" : select.options[select.selectedIndex].text,
                        "id_materia" : select.options[select.selectedIndex].value
                    };
                }
                if (operacion=="modificacion") {
                    var select = document.getElementById("materia_modificacion");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "catedra": "",
                        "carrera" : "",
                        "materia" : document.getElementById("nueva_materia_modificacion").value,
                        "id_materia" : select.options[select.selectedIndex].value
                    };
                }
                break;

            // Armar JSON Carreras
            case "carreras" :
                if (operacion=="alta") {
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "id_carrera" : "",
                        "carrera" : document.getElementById("carrera_alta").value
                    };
                }
                if (operacion=="modificacion") {
                    var select = document.getElementById("carrera_modificacion");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "id_carrera" : select.options[select.selectedIndex].value,
                        "carrera" : document.getElementById("nueva_carrera_modificacion").value
                    };
                } 
                if(operacion=="baja"){
                    var select = document.getElementById("carrera_baja");
                    json = {
                        "apiVer" : "1.0",
                        "idSesion" : "", 
                        "operacion" : operacion,
                        "id_carrera" : select.options[select.selectedIndex].value,
                        "carrera" : select.options[select.selectedIndex].text
                    };
                }
                break;

            //Si el flag es invalido, entra por default y devuelve error.
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

    //Metodo para enviar JSON a servidor
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
    if(json.fichada.catedra != "Didier" || json.fichada.carrera != "Programacion" || json.fichada.materia != "Proyecto" || json.fichada.horario != "19:00hs" || json.fichada.tipoDeClase != "teorico" || json.fichada.claveDeClase != "30" || json.fichada.alumnos[0].nombre != "ivan" || !json.fichada.alumnos[0].presente) {
        return "testRegister has ERRORS: RegisterController not returning the right value. RegisterController::: Fichadas";
    }

    json = rc.armarJson("catedras");

    //Chequeo JSON Catedra
    if(json.catedra.catedra != "Didier" || json.catedra.nombre != "Proyecto" || json.catedra.titularDeCatedra != "Didier" || json.catedra.ofertaHoraria != "2AB" ) {
        return "testRegister has ERRORS: RegisterController not returning the right value. RegisterController::: catedra";
    }

    json = rc.armarJson("materias");

    //Chequeo JSON Materia
    if(json.materia.catedra != "Didier" || json.materia.materia != "Proyecto" || json.materia.carrera != "Programacion") {
        return "testRegister has ERRORS: RegisterController not returning the right value. RegisterController::: materia";
    }

    json = rc.armarJson("vacio");
    
    //Chequeo JSON valores vacios
    if(json.usuario.nombre != "Gaston" || json.usuario.apellido != "" || json.usuario.matricula != "") {
        return "testRegister has ERRORS: RegisterController not returning the right value. RegisterController::: Empty fields: Lastname";
    }

    //Chequeo el metodo parseOfertaHoraria
    var ofertaHoraria = rcr.parseOfertaHoraria(3, 7, 9);

    if (ofertaHoraria != '379') {
        return "testRegister has ERRORS: RegisterControllerRemote.parseOfertaHoraria not returning the right value. RegisterController :: parseOfertaHoraria(dias, hora_inicio, hora_fin)";
    }

    return null;
}