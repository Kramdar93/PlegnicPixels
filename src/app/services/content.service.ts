import { Injectable } from '@angular/core';
import { Http,Response,ResponseOptions } from "@angular/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs/observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class ContentService {

  CGI:string = "http://plegnicpixels.games/content.cgi"

  //manual cache vars
  blogs:{title:string,date:string,author:string,html:string}[];
  games:{title:string,status:string,version:string,releaseDate:string,sections:any}[];
  contributors:{name:string,nick:string,position:string,email:string,bio:string}[];
  about:{sections:any};
  peel:any[];

  constructor(private http:Http) { }

  GetContent(type:"blog"|"game"|"contributor"|"peel"|"about"){
    //manual caching, is this even necessary?
    if(type == "blog" && this.blogs){
      return this.WrapObj(this.blogs);
    }
    else if(type == "game" && this.games){
      return this.WrapObj(this.games);
    }
    else if(type == "contributor" && this.contributors){
      return this.WrapObj(this.contributors);
    }
    else if(type == "about" && this.about){
      return this.WrapObj(this.about);
    }
    else if(type == "peel" && this.peel){
      return this.WrapObj(this.peel);
    }

    return this.http.get(this.CGI,{params:{type:type}})
      .pipe(tap(data=>{
        if(type == "blog"){
          this.blogs = data.json();
        }
        else if(type == "game"){
          this.games = data.json();
        }
        else if(type == "contributor"){
          this.contributors = data.json();
        }
        else if(type == "about"){
          this.about = data.json();
        }
        else if(type == "peel"){
          this.peel = data.json();
        }
      }));
  }

  //wraps an object in an http-like response, only needed if we're going to manually cache the data.
  WrapObj(obj:any){
    return of(
      new Response(
        new ResponseOptions({
          body:JSON.stringify(obj)
        })
      )
    );
  }

}
