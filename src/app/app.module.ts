import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailPokemonComponent } from './pages/detail-pokemon/detail-pokemon.component';
import { CreatePokemonComponent } from './pages/create-pokemon/create-pokemon.component';
import { EditPokemonComponent } from './pages/edit-pokemon/edit-pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NombreTypePipe } from './pipes/nombre-type.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerErrorComponent } from './pages/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPokemonComponent,
    LandingPageComponent,
    HomeComponent,
    DetailPokemonComponent,
    CreatePokemonComponent,
    EditPokemonComponent,
    NombreTypePipe,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    //importamos el modulo HttpCLientMOdule para hacer peticiones http
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
