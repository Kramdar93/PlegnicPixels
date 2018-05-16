import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:"home",component:HomeComponent},
      {path:"",redirectTo:"home"}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
