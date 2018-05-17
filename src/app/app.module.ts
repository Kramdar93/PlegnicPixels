import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { BlogComponent } from './blog/blog.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';

import { ContentService } from "./services/content.service";
import { MockContentService } from "./services/mock-content.service";

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
      {path:"about",component:AboutComponent},
      {path:"",redirectTo:"home",pathMatch:"full"}
    ])
  ],
  providers: [{provide:ContentService, useClass:MockContentService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
