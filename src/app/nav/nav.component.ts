import { Component, OnInit } from '@angular/core';

import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //games:any;

  constructor(private content:ContentService) {
    //content.GetContent("game").subscribe(data=> this.games=data.json().filter(x => x.status=="released") );
    
   }

  ngOnInit() {
  }

}
