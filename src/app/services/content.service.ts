import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap,map } from "rxjs/operators";
import { Observable } from "rxjs/observable";
import { of } from "rxjs/observable/of";
import { environment } from '../../environments/environment';
import { parse } from 'url';

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
        let aTime:number = DateStringToNumber(a.date);
        let bTime:number = DateStringToNumber(b.date);
        let result = bTime - aTime;
        return result == 0? FinalLexicographicSort(a,b) : result;
      }); // try reverse sort by date
      return;
    }
    if(data[0].hasOwnProperty("joined")){
      data.sort(function(a,b){
        let aTime:number = DateStringToNumber(a.joined);
        let bTime:number = DateStringToNumber(b.joined);
        let result = bTime - aTime;
        return result == 0? FinalLexicographicSort(a,b) : result;
      }); // try reverse sort by join date
      return;
    }
    if(data[0].hasOwnProperty("releaseDate")){ // this is _could_ be a date
      data.sort(function(a,b){
        let aTime:number = DateStringToNumber(a.releaseDate);
        let bTime:number = DateStringToNumber(b.releaseDate);
        let result: number = 0;
        if(!isNaN(aTime) && !isNaN(bTime)){
          result = bTime - aTime;
        } else if (isNaN(aTime) && !isNaN(bTime)){ // a is not date, place before b.
          result = -1;
        } else if (!isNaN(aTime) && isNaN(bTime)){ // b is not date, place before a.
          result = 1;
        } else { // both not dates so... 
          // sort lexicographically if different (even though it is probably just 'TBD' and would also work for the yyy-mm-dd format)
          result = a.releaseDate < b.releaseDate ? -1 : a.releaseDate > b.releaseDate ? 1 : 0;
        }

        // the temporal reference we found is equal! so do some secondary sorting attempts.
        return result == 0? FinalLexicographicSort(a,b) : result;
      }); // try reverse sort by releaseDate
      
    }
    //else don't sort because there is no temporal reference eg about blurbs.
  }
}

function FinalLexicographicSort(a:any,b:any){
  //sort by title if it exists
  if(a.hasOwnProperty("title") && b.hasOwnProperty("title")){
    return a.title.localeCompare(b.title);
  } else if(a.hasOwnProperty("name") && b.hasOwnProperty("name")){
    return a.title.localeCompare(b.title);
  }
  // otherwise it's all the same to me!
  return 0;
}

// expect a standard YYYY-MM-DD format date to transform and return as millisec value, otherwise return NaN
function DateStringToNumber(str:String){
  let tokens = str.split('-').map(x=>parseInt(x));
  if(tokens.length != 3 || tokens.some(x=>x==NaN)){
    return NaN; // can't parse, return NaN
  }
  let date = new Date(tokens[0],tokens[1]-1,tokens[2]); //zero indexed months, others are one indexed.
  return date.getTime(); // this method only converts to a number for comparison purposes so that's really all we need.
}