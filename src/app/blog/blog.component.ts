import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs:any[] = [];
  selectedId:number = -1;

  monthStrings:String[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  constructor(private content:ContentService, private route:ActivatedRoute) {
    // gotta love nested observables...
    this.route.params.subscribe(params => {
      if(params.id){
        this.selectedId = params.id;
      }
      content.GetContent("blog")
        .subscribe( data=> {
          if(Array.isArray(data))
            this.organizePosts(data);
        });
      });
  }

  ngOnInit() {
  }

  organizePosts(data:any[]){
    for (const b of data) {
      var date = b.date.split('-');
      var y = date[0];
      var m = date[1];
      var d = date[2];
      if(b.id == this.selectedId){
        b.shouldShow = true;
      } else {
        b.shouldShow = false;
      }

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

    //sort it out and friends
    for(const y of this.blogs){
      let yShow = false;
      for(const m of y.months){
        let mShow = false;
        //sort each day's blogs
        for(const d of m.days){
          //don't sort this since ids are non sequential. also content service sorts these.
          //TODO: optimize this sorting based on the work content service already did...
          if(d.posts.some((x)=>x.shouldShow)){
            d.shouldShow = true;
            mShow = true;
            yShow = true;
          }
        }
        m.days.sort((x,y)=>x.day-y.day); //sort days
        m.shouldShow = mShow;
      }
      y.months.sort((x,y)=>x.month-y.month); //sort months
      y.shouldShow = yShow
    }
    this.blogs.sort((x,y)=>x.year-y.year); //sort years

    //replace month words
    for(const y of this.blogs){
      for(const m of y.months){
        //replace with month words
        if(m.month >= 0 && m.month < this.monthStrings.length){
          m.month = this.monthStrings[m.month - 1]; // one indexed correction
        }
      }
    }
  }

}
