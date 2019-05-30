import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { tap,map } from "rxjs/operators";
import { Observable } from "rxjs/observable";
import { of } from "rxjs/observable/of";
import { environment } from '../../environments/environment';

@Injectable()
export class ContentService {

  path:string = environment.production? "https://plegnicpixels.games/content/" : "http://localhost:8080/content/";

  //manual cache vars
  blogs:{id:string,title:string,date:string,author:string,sections:string}[];
  games:{id:string,title:string,status:string,version:string,releaseDate:string,sections:any}[];
  contributors:{name:string,nick:string,position:string,email:string,bio:string}[];
  about:{sections:any};

  constructor(private http:Http) {
   }

  GetContent(type:"blog"|"game"|"contributor"|"about"){
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

    return this.http.get(this.path+type+".json")
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
      }),map(data=>data.json()));
  }

  //overload
  GetIndividualContent(type:"blog"|"game"|"contributor"|"about",id:string){
    return this.GetContent(type).pipe(map(data=>data.find(x=>x.id==id)));
  }

  //wraps an object in an http-like response, only needed if we're going to manually cache the data.
  WrapObj(obj:any){
    return of(obj); //we already parsed the data into json so we don't even need the response etc wrappers.
  }

}
