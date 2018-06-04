import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  contributors:any[];
  about:any[];

  constructor(private content:ContentService) {
    content.GetContent("about").subscribe(data=>this.about=data[0]);
    content.GetContent("contributor").subscribe(data=>this.contributors=data);
   }

  ngOnInit() {
  }

}
