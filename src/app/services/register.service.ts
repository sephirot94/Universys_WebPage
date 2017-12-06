import { Injectable } from '@angular/core';

@Injectable()
export class RegisterService {

  public jsonMail:jsonMails;
  public jsonCatedras:jsonCatedras;
  public jsonCarreras:jsonCarreras;
  public jsonAlumnos:jsonAlumnos;
  public jsonMaterias:jsonMaterias;

  constructor() { 
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

interface jsonMails {
  mails:{id:number, mail:string}[];
}

interface jsonAlumnos {
  alumnos:{id:number, nombre:string}[];
}

interface jsonCarreras {
  carreras:{id:number, carrera:string}[];
}

interface jsonCatedras {
  catedras:{id:number, catedra:string}[];
}

interface jsonMaterias {
  materias:{id:number, materia:string}[];
}