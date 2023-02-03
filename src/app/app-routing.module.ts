import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePokemonComponent } from './pages/create-pokemon/create-pokemon.component';
import { DetailPokemonComponent } from './pages/detail-pokemon/detail-pokemon.component';
import { HomeComponent } from './pages/home/home.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"home"
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"detail/:id",
    component:DetailPokemonComponent
  },
  {
    path:"create-pokemon",
    component:CreatePokemonComponent
  },
  {
    path:"server-error",
    component:ServerErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
