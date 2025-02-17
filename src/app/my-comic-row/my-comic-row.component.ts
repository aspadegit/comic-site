import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbRatingModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Comic } from '../comic';
import { Dictionary } from '../comic';
import { ComicServiceService } from '../comic-service.service';

@Component({
  selector: 'app-my-comic-row',
  imports: [NgbDropdownModule, NgbRatingModule, NgbCollapseModule, FormsModule],
  templateUrl: './my-comic-row.component.html',
  styleUrl: './my-comic-row.component.css'
})
export class MyComicRowComponent {

  constructor(private comicService : ComicServiceService) {};
  
  comicId = input(0);
  rating = 0;
  isCollapsed = true;
  userNotes = '';
  name = 'NOT_SET';
  type = 'NOT_SET';
  desc = 'NOT_SET';
  date = 'NOT_SET';
  image = '';
  owned = [false, false];

  comic: Comic | null = null;

  setUpComic() : void
  {
    this.comic = this.comicService.getComic(this.comicId());
    let comic = this.comic;

    if(comic != null)
    {
      this.name = comic.name;
      this.type = comic.type;
      this.desc = comic.description;
      this.rating = comic.userRating;
      this.userNotes = comic.userDetails;
      this.owned = comic.owned;
      this.image = comic.image;
      this.date = comic.date;
    }
 
  }

  checkChanged() : void
  {
    if(this.comic != null)
    {
      this.comic.owned = this.owned;
      this.comicService.updateComic(this.comicId(), this.comic);
    }
    
  }
  
  rateChanged() : void
  {
    if(this.comic != null)
      {
        this.comic.userRating = this.rating;
        this.comicService.updateComic(this.comicId(), this.comic);
      }
  }

  notesChanged() : void
  {
    if(this.comic != null)
      {
        this.comic.userDetails = this.userNotes;
        this.comicService.updateComic(this.comicId(), this.comic);
      }
  }
}
