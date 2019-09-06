import { NgModule } from'@angular/core';
import { Routes, RouterModule } from'@angular/router'; // module des routes et classe de Typage

import { AlbumsComponent } from './albums/albums.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { LoginComponent } from './login/login.component';

const albumsRoutes: Routes = [
  {
    path:'albums',
    component: AlbumsComponent
  },
  {
    path:'',
    redirectTo:'/albums',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },{
    path:'album/:id',
    component: AlbumDescriptionComponent
  },
];

@NgModule(
  {
    imports: [RouterModule.forRoot(albumsRoutes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
