import { Component, inject, input, output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbRatingModule, NgbCollapseModule, NgbModalModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Comic } from '../comic';
import { Dictionary } from '../comic';
import { ComicServiceService } from '../comic-service.service';

@Component({
  selector: 'app-my-comic-row',
  imports: [NgbDropdownModule, NgbRatingModule, NgbCollapseModule, NgbModalModule, FormsModule],
  templateUrl: './my-comic-row.component.html',
  styleUrl: './my-comic-row.component.css'
})
export class MyComicRowComponent {

  constructor(private comicService : ComicServiceService) {};
  
  comicId = input(0);
  rating = 0;
  isCollapsed = true;
  userNotes = '';
  owned = [false, false];

  deleted = false;

  delete = output<void>();

  modalService = inject(NgbModal);

  comic: Comic | null = null;

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-delete' }).result.then(
			() => {
        //when hitting "confirm"
				this.removeComic();
			},
			() => {
        // when dismissing the modal (do nothing)
			},
		);
	}


  setUpComic() : void
  {
    this.comic = this.comicService.getComic(this.comicId());
    let comic = this.comic;

    if(comic != null)
    {
      this.rating = comic.userRating;
      this.userNotes = comic.userDetails;
      this.owned = comic.owned;
    }
 
  }

  removeComic()
  {
    this.comicService.removeComicId(this.comicId());
    this.delete.emit();
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
