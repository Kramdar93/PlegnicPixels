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
        //generate id
        let populatedData:any[] = data.map(x=>{
          let newId:String = '';
          if(x.hasOwnProperty('date')){
            newId += x.date;
          }
          if(x.hasOwnProperty('title')){
            newId += x.title;
          }
          if(x.hasOwnProperty('name')){
            newId += x.name;
          }
          if(x.hasOwnProperty('nick')){
            newId += x.nick;
          }
          if(newId.length > 0){ // only set the new id if we have something to base it on. else don't so it errs and hopefully gets seen...
            x.id = this.HashCode(newId);
          }
          return x;
        });
        this.SortBySomeMeans(populatedData);
        return populatedData;
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

  // hashcode function from SO since it doesn't exist in vanilla js.
  // ty @esmiralha https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript 
  HashCode(str:String){
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      let chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  SortBySomeMeans(data:any[]){
    if(data[0].hasOwnProperty("date")){
      data.sort(function(a,b){
        let aDate:Date = new Date(a.date);
        let bDate:Date = new Date(b.date);
        return bDate.getTime() - aDate.getTime();
      }); // try reverse sort by date
      return;
    }
    if(data[0].hasOwnProperty("joined")){
      data.sort(function(a,b){
        let aDate:Date = new Date(a.joined);
        let bDate:Date = new Date(b.joined);
        return bDate.getTime() - aDate.getTime();
      }); // try reverse sort by join date
      return;
    }
    if(data[0].hasOwnProperty("releaseDate")){ // this is _could_ be a date
      data.sort(function(a,b){
        let aTime:number = Date.parse(a.releaseDate);
        let bTime:number = Date.parse(b.releaseDate);
        if(aTime != NaN && bTime != NaN){
          return bTime - aTime;
        } else if (aTime == NaN && bTime != NaN){ // b is not date, place before a.
          return 1;
        } else if (aTime != NaN && bTime == NaN){ // a is not date, place before b.
          return -1;
        } else { // both not dates so sort alphabetically (even though it is probably just 'TBD')
          return a.releaseDate < b.releaseDate ? -1 : a.releaseDate > b.releaseDate ? 1 : 0;
        }
      }); // try reverse sort by releaseDate
      return;
    }
    //else don't sort because there is no temporal reference eg about blurbs.
  }
}
