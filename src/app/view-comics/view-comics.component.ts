import { Component, inject, viewChild, ViewContainerRef } from '@angular/core';
import { MyComicRowComponent } from "../my-comic-row/my-comic-row.component";
import { ComicServiceService } from '../comic-service.service';

@Component({
  selector: 'app-view-comics',
  imports: [MyComicRowComponent],
  templateUrl: './view-comics.component.html',
  styleUrl: './view-comics.component.css'
})
export class ViewComicsComponent {

  rowVcr = viewChild('comicRowContainer', {read: ViewContainerRef});
  
  constructor(private comicService : ComicServiceService) {};
  
  ngOnInit() : void
  {

    console.log("view comics is getting",this.comicService.getComics());
    this.showComics();
  }

  showComics() : void 
  {
    // clear the rows
    this.rowVcr()?.clear();

    // loop through & instantiate new result rows
    for(let key in this.comicService.getComics())
    {
      let ref = this.rowVcr()?.createComponent(MyComicRowComponent);
      ref?.setInput('comicId', key);
      ref?.instance.setUpComic();
    }
  }

}
