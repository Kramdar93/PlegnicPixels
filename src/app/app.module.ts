import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MessagesComponent,
    HomeComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
        { path: 'home', component: HomeComponent },
        { path: 'game', component: GameComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }