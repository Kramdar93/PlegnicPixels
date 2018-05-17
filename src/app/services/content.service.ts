import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class ContentService {

  CGI:string = "http://plegnicpixels.games/content.cgi"

  constructor(private http:Http) { }

  GetContent(type:"blog"|"game"|"contributor", id?:string){
    return this.http.get(this.CGI,{params:{type:type, id:id}});
  }

}
