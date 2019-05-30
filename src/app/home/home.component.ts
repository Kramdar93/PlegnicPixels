import { Component, OnInit } from '@angular/core';

import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numGames = 4; // make this%2 == 0 for filling last row on homescreen
  numBlogs = 4;
  numSubsections = 4; //limit the size of articles.
  peels:any = {games:[],blogs:[]};
  blurb:any;

  constructor(private content:ContentService) {
    content.GetContent("blog").subscribe(data=> this.peels.blogs=data.map(d=>this.trimSubsections(d)).slice(0,this.numBlogs));
    content.GetContent("game").subscribe(data=> this.peels.games=data.map(d=>this.trimSubsections(d)).slice(0,this.numGames));
    //have to dereference data since it is every file in content/about even if it is only one file. Variety!
    content.GetContent("about").subscribe(data=> this.blurb=data[Math.floor(Math.random()*data.length)].sections[0] ); 
   }

  ngOnInit() {
  }

  trimSubsections(json:any){
    console.log(json);
    let limit = 0;
    let newSections=[];
    for(let i = 0; i < json.sections.length; ++i){ //why for in didn't work ill never know...
      console.log(json.sections[i]);
      let newSub = [];
      for(let j = 0; j < json.sections[i].subsections.length; ++j){
        if(limit < this.numSubsections){
          newSub.push(json.sections[i].subsections[j]);
          ++limit;
        } else {
          break;
        }
      }
      newSections.push({heading:json.sections[i].heading,subsections:newSub});
      if(limit >= this.numSubsections){
        break;
      }
    }
    console.log(newSections);
    json.sections = newSections;
    return json;
  }

}
