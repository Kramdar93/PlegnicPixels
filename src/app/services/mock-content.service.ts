import { Injectable } from '@angular/core';

import { Observable } from "rxjs/observable";
import { of } from "rxjs/observable/of";
import { Response, ResponseOptions } from "@angular/http";

//declare require since it'll definitely be there. this is only for dev anyway so it's fine.
declare var require:any;

//load in test jsons
var contributors = require("../../../content/templates/contributor.json")
var games = require("../../../content/templates/game.json")
var blogs = require("../../../content/templates/blog.json")
var about = require("../../../content/templates/blurb.json")

@Injectable()
export class MockContentService {

  constructor() { }

  GetContent(type:"blog"|"game"|"contributor"|"peel"|"about"){
    if(type == "blog"){
      return this.WrapObj(blogs);
    }
    else if(type == "game"){
      return this.WrapObj(games);
    }
    else if(type == "contributor"){
      return this.WrapObj(contributors);
    }
    else if(type == "about"){
      return this.WrapObj(about);
    }
    else{ //'peel' ie get the first few of each list (for home)
      return this.WrapObj({blogs:blogs,games:games});
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
