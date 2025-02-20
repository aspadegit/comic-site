import { Injectable } from '@angular/core';
import { Comic } from './comic';
import { Dictionary } from './comic'; // not a true Dictionary; just for returning type <int, Comic>
import { inject } from '@angular/core';
import { LOCAL_STORAGE } from './tokens';
import { relative } from 'path/posix';

@Injectable({
  providedIn: 'root'
})

//NOTE: CURRENTLY USING SESSION STORAGE (clears on browser close) (in app.config.ts)
  // may want to use localStorage (saves until cache is clear)
  // may want to implement a back-end
export class ComicServiceService {

  private comicDict : Dictionary<Comic>;
  private storage = inject(LOCAL_STORAGE);

  constructor() {
    
    this.comicDict = this.getComicsFromStorage();
    
   }

  getComics() : Dictionary<Comic>
  {
    return this.getComicsFromStorage();
  }

  // converts comic array to comic dict & sets it in storage
  setComics(comics : Comic[]) : void
  {
    let dict : Dictionary<Comic> = {};
    for(let i = 0; i < comics.length; i++)
    {
      dict[comics[i].id] = comics[i];

    }
    this.comicDict = dict;
    this.setComicsToStorage();
  }

  getComicsArray() : Comic[]
  {
    let dict : Dictionary<Comic> = this.getComics();
    let returnArr : Comic[] = [];
    for(let key in dict)
    {
      returnArr.push(dict[key]);
    }
    return returnArr;
  }

  getComic(id : number) : Comic | null
  {
    return this.comicDict[id];
    
  }

  addComic(c : Comic) : void
  {
    console.log("added comic", c);
    this.comicDict[c.id] = c;
    this.setComicsToStorage();
    console.log("after adding, comicDict is now ", this.comicDict);
  }

  //returns success/unsuccess
  removeComicId(id : number) : boolean
  {
    if(id in this.comicDict)
    {
      delete this.comicDict[id];
      this.setComicsToStorage();
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

  updateComic(comicId : number, newComic : Comic)
  {
    this.comicDict[comicId] = newComic;
    this.setComicsToStorage();
  }


  private setComicsToStorage() : void
  {
    try {
      this.storage.setItem('comics', JSON.stringify(this.comicDict));

    }
    catch(e)
    {
      console.log(e);
    }
  }
  private getComicsFromStorage() : Dictionary<Comic>
  {
    let returnValue : Dictionary<Comic> = {};

    try
    {
      let json:string | null = this.storage.getItem('comics');

      if(json != null)
        returnValue = JSON.parse(json);
    
    }
    catch(e)
    {
      console.log(e);
    }
    finally
    {
      if(returnValue == null)
        returnValue = {};

      return returnValue;
    }
  }
  
}
