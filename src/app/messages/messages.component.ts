import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    Messages: string[];
  constructor() {
      this.Messages = ['You can now choose your own pictures.'];
  }

  ngOnInit() {
  }

}