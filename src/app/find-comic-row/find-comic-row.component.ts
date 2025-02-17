import { Component, inject } from '@angular/core';
import { input, InputSignal } from '@angular/core';
import { Comic } from '../comic';
import { ComicServiceService } from '../comic-service.service';


@Component({
  selector: 'app-find-comic-row',
  imports: [],
  templateUrl: './find-comic-row.component.html',
  styleUrl: './find-comic-row.component.css'
})
export class FindComicRowComponent {
  
  id = input(-1);
  name = input('Title');
  type = input('Type');
  date = input('Date');
  imgUrl = input("https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/4245087-01.jpg");
  desc = input('Description');

  isInList : boolean = false;

  constructor(private comicService : ComicServiceService) {};

  ngOnInit()
  {
    if(this.comicService.getComic(this.id()) != null)
    {
      this.isInList = true;
    }
  }

  addComic() : void
  {
    let newComic : Comic = {
      id: this.id(),
      comicVineId: this.id(),
      name: this.name(),
      description: this.desc(),
      image: this.imgUrl(),
      type: this.type(),
      userRating: -1,
      userDetails: '',
      date: this.date(),
      owned: [false, false]
    }
    
    this.comicService.addComic(newComic);
    this.isInList = true;
  }

}

