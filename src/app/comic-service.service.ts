import { Injectable } from '@angular/core';
import { Comic } from './comic';
import { Dictionary } from './comic'; // not a true Dictionary; just for returning type <int, Comic>

@Injectable({
  providedIn: 'root'
})
export class ComicServiceService {

  comicDict : Dictionary<Comic>;

  constructor() {
    this.comicDict = {};
   }

  getComics() : Dictionary<Comic>
  {
    return this.comicDict;
  }

  addComic(c : Comic) : void
  {
    console.log(this.comicDict);
    this.comicDict[c.id] = c;
  }

  //returns success/unsuccess
  removeComicId(id : number) : boolean
  {
    if(id in this.comicDict)
    {
      delete this.comicDict[id];
      return true;
    }
    return false;
  }

  //returns success/unsuccess
  // O(n), i think is unavoidable (due to being unsorted)
  removeComicName(name : string) : boolean
  {
    for(let key in this.comicDict)
    {
      //delete the first name match
      if(name === this.comicDict[key].name)
      {
        delete this.comicDict[key];
        return true;
      }
    }
    return false;
  }

  
  
}
