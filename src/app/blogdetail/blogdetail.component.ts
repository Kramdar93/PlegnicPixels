import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.css']
})
export class BlogdetailComponent implements OnInit {

  blog:any = {};

  constructor(private content:ContentService, private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      content.GetIndividualContent("blog", params.id)
        .subscribe( data=> this.blog = data );
    });
   }

  ngOnInit() {
  }

}
