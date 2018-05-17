import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/Observable/of";
import { Response, ResponseOptions } from "@angular/http";

//load in test jsons
var contributors = [require("../../../content/contributors/test.json")]
var games = [require("../../../content/games/test.json")]
var blogs = [require("../../../content/blog/test.json")]

@Injectable()
export class MockContentService {

  constructor() { }

  GetContent(type:"blog"|"game"|"contributor",id?:string){
    if(type == "blog"){
      return this.WrapObj(id? blogs[0] : blogs);
    }
    else if(type == "game"){
      return this.WrapObj(id? games[0] : games);
    }
    else{ //contributor
      return this.WrapObj(id? games[0] : games);
    }
  }

  //wraps an object in an http-like response in order to match content service as close as possible.
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
