import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games:any;

  constructor(private content:ContentService) {
    content.GetContent("game")
      .subscribe(data=>this.games=data);
   }

  ngOnInit() {
  }

}
