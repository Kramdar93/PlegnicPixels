import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-gamedetail',
  templateUrl: './gamedetail.component.html',
  styleUrls: ['./gamedetail.component.css']
})
export class GamedetailComponent implements OnInit {

  selectedGame:any;

  constructor(private content:ContentService, private router:Router, private route:ActivatedRoute) {
   }

   ngOnInit() {
    this.selectedGame = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.content.GetIndividualContent('game',params.get('id')))
    );
  }



}
