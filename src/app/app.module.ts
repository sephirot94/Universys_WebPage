import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { Type } from '@angular/core';

import {CommonService} from './services/common.service';
import {RegisterService} from './services/register.service';
import { AbmUsuariosComponent } from './components/abm-usuarios/abm-usuarios.component';
import { AbmCatedrasComponent } from './components/abm-catedras/abm-catedras.component';
import { AbmCarrerasComponent } from './components/abm-carreras/abm-carreras.component';
import { AbmMateriasComponent } from './components/abm-materias/abm-materias.component';
import { AbmFichadasComponent } from './components/abm-fichadas/abm-fichadas.component';
import { AbmNotasComponent } from './components/abm-notas/abm-notas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AbmUsuariosComponent,
    AbmCatedrasComponent,
    AbmCarrerasComponent,
    AbmMateriasComponent,
    AbmFichadasComponent,
    AbmNotasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
