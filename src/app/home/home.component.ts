import { Component, OnInit } from '@angular/core';

import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  peels:any;
  blurb:any;

  constructor(private content:ContentService) {
    content.GetContent("peel").subscribe(data=> this.peels=data );
    //have to dereference data since it is every file in content/about even if it is only one file.
    content.GetContent("about").subscribe(data=> this.blurb=data[0].sections[0] ); 
   }

  ngOnInit() {
  }

}
