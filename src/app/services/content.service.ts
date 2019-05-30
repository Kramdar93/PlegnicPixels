import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap,map } from "rxjs/operators";
import { Observable } from "rxjs/observable";
import { of } from "rxjs/observable/of";
import { environment } from '../../environments/environment';

@Injectable()
export class ContentService {

  path:string = environment.production? "https://plegnicpixels.games/content/" : "http://localhost:8080/content/";

  constructor(private http:HttpClient) {
   }

  GetContent(type:"blog"|"game"|"contributor"|"about"){
    return this.http.get(this.path+type+".json");
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
