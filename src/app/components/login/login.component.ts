import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public common:CommonService) { }

  ngOnInit() {
  }

  loginLogic (username, pass)
  {
      if(username=="admin@admin.com" && pass=="Admin1234") {
          return {
              "api-version": "1.0",
              "error_code": "200",
              "usuario": {
                 "nombre": "Diego",
                 "apellido": "Maradona",
                 "idSesion": "1234",
                 "rol": "administrador"
              }
           };
      }
      if(pass=="Admin1234" && username!="admin@admin.com") {
          return { "api-version" : "1.0", "error_code" : "680" };
      }
      if(pass!="Admin1234" && username=="admin@admin.com") {
          return { "api-version" : "1.0", "error_code" : "777" };
      }
      
      return { "api-version" : "1.0", "error_code" : "800" };
  }

  //Este metodo ejecuta el Login Mockeado
  login (userField, passField)
  {
      var json = this.loginLogic(document.getElementById(userField).value, document.getElementById(passField).value);
      // setCookie("idSesion", json.usuario.idSesion);
      if (json.usuario.rol=="administrador") {
          window.location.href = 'perfilAdministrador.html';
      }
      else if (json.usuario.rol=="alumno") {
          window.location.href = 'perfilAlumno.html';
      }
      else if (json.usuario.rol=="profesor") {
          window.location.href = 'perfilProfesor.html';
      }
      else {
          console.log("Error");
      }
  };

  //Este metodo ejecuta el logout Mockeado
  logout () {
      // dropCookie("idSesion");
      window.location.href = '../html/login.html';
  }
}
