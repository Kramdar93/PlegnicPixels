import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gamedetail',
  templateUrl: './gamedetail.component.html',
  styleUrls: ['./gamedetail.component.css']
})
export class GamedetailComponent implements OnInit {

  selectedGame:any;

  constructor(private content:ContentService, private route:ActivatedRoute) {
    //first subscribe to parameters being ready
    this.route.params.subscribe(params => {
      //then subscribe to getting data
      this.content.GetIndividualContent('game',params.id).subscribe(data => {
        //then set it
        this.selectedGame=data;
      });
    });
   }

  ngOnInit() {
    //ng tutorial had some fiddly stuff here instead that didn't work.
  }



}
