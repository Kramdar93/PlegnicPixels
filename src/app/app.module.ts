import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { BlogComponent } from './blog/blog.component';
import { NavComponent } from './nav/nav.component';

import { ContentService } from "./services/content.service";
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    BlogComponent,
    NavComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path:"home",component:HomeComponent},
      {path:"blog",component:BlogComponent},
      {path:"games",component:GamesComponent},
      {path:"",redirectTo:"home"}
    ])
  ],
  providers: [ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
