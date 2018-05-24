import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs:any[] = [];

  constructor(private content:ContentService) {
    content.GetContent("blog")
    .subscribe( data=> this.organizePosts(data.json()) );
   }

  ngOnInit() {
  }

  organizePosts(data:any[]){
    for (const b of data) {
      var date = b.date.split('-');
      var y = date[0];
      var m = date[1];
      var d = date[2];

      //spaghettifest
      var fy = this.blogs.find(x=>x.year == y);
      if(!fy){
        this.blogs.push({
          year:y,months:[{
            month:m,days:[{
              day:d,posts:[b]
            }]
          }]
        });
      }
      else{
        var iy = this.blogs.findIndex(x=>x.year == y);
        var fm = fy.months.find(x=>x.month == m);
        if(!fm){
          this.blogs[iy].months.push(
            {
              month:m,days:[{
                day:d,posts:[b]
              }]
            }
          )
        }
        else{
          var im = this.blogs[iy].months.findIndex(x=>x.month == m);
          var fd = fm.days.find(x=>x.day == d);
          if(!fd){
            this.blogs[iy].months[im].days.push({ day:d,posts:[b] });
          }
          else{
            var id = fm.days.findIndex(x=>x.day==d);
            this.blogs[iy].months[im].days[id].posts.push(b);
          }
        }
      }
    }

    //console.log(this.blogs);
  }

}
