import { Component, inject } from '@angular/core';
import { MyComicRowComponent } from "../my-comic-row/my-comic-row.component";
import { ComicServiceService } from '../comic-service.service';

@Component({
  selector: 'app-view-comics',
  imports: [MyComicRowComponent],
  templateUrl: './view-comics.component.html',
  styleUrl: './view-comics.component.css'
})
export class ViewComicsComponent {

  constructor(private comicService : ComicServiceService) {};
  
  ngAfterViewInit() : void
  {

    console.log("view comics is getting",this.comicService.getComics());
  }
}
