import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { CarouselModule } from "ngx-bootstrap";

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { BlogComponent } from './blog/blog.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';

import { ContentService } from "./services/content.service";
import { MockContentService } from "./services/mock-content.service";
import { DevcornerComponent } from './devcorner/devcorner.component';
import { environment } from '../environments/environment';
import { GamedetailComponent } from './gamedetail/gamedetail.component';
import { BlogdetailComponent } from './blogdetail/blogdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    BlogComponent,
    NavComponent,
    AboutComponent,
    DevcornerComponent,
    GamedetailComponent,
    BlogdetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CarouselModule.forRoot(),
    RouterModule.forRoot([
      {path:"home",component:HomeComponent},
      {path:"blogs",component:BlogComponent},
      {path:"blog/:id",component:BlogdetailComponent},
      {path:"about",component:AboutComponent},
      {path:"devcorner",component:DevcornerComponent},
      {path:"games",component:GamesComponent},
      {path:"game/:id",component:GamedetailComponent},
      {path:"**",redirectTo:"home"}
    ])
  ],
  providers: [{provide:ContentService, useClass: environment.production? ContentService : ContentService}], //fancy auto production swap
  bootstrap: [AppComponent]
})
export class AppModule { }
