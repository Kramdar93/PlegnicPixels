import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap,map } from "rxjs/operators";
import { Observable } from "rxjs/observable";
import { of } from "rxjs/observable/of";
import { environment } from '../../environments/environment';

@Injectable()
export class ContentService {

  CGI:string = environment.production? "https://plegnicpixels.games/cgi-bin/content.pl" : "http://localhost:8080/";

  constructor(private http:HttpClient) {
   }

  GetContent(type:"blog"|"game"|"contributor"|"about"){
      return this.http.get(this.CGI+"?type="+type).pipe(map(data=>{
      if(Array.isArray(data)){
        if(data[0].hasOwnProperty("id"))
          data.sort(function(a,b){return b.id-a.id}); // reverse sort by content id to see most recent
        return data;
      } else {
        console.error("Tried to get an array from a non array-type content source?");
        return null;
      } 
    }));
  }

  //overload
  GetIndividualContent(type:"blog"|"game"|"contributor"|"about",id:string){
    return this.GetContent(type).pipe(map(data=>{
      if(Array.isArray(data)){
        return data.find(x=>x.id==id);
      } else {
        console.error("Tried to get an array from a non array-type content source?");
        return null;
      }
    }));
  }
}
