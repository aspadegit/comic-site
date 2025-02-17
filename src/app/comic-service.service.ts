import { Injectable } from '@angular/core';
import { Comic } from './comic';
import { Dictionary } from './comic'; // not a true Dictionary; just for returning type <int, Comic>

@Injectable({
  providedIn: 'root'
})

//NOTE: CURRENTLY USING SESSION STORAGE (clears on browser close)
  // may want to use localStorage (saves until cache is clear)
  // may want to implement a back-end
export class ComicServiceService {

  private comicDict : Dictionary<Comic>;

  constructor() {
    this.comicDict = JSON.parse(sessionStorage.getItem('comics')!);
   }

  getComics() : Dictionary<Comic>
  {
    return JSON.parse(sessionStorage.getItem('comics')!);
  }

  addComic(c : Comic) : void
  {
    console.log("added comic", c);
    this.comicDict[c.id] = c;
    sessionStorage.setItem('comics', JSON.stringify(this.comicDict));
    console.log("after adding, comicDict is now ", this.comicDict);
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
