import { Component, inject, viewChild, ViewContainerRef } from '@angular/core';
import { MyComicRowComponent } from "../my-comic-row/my-comic-row.component";
import { ComicServiceService } from '../comic-service.service';
import { CsvConverterService } from '../csv-converter.service';

@Component({
  selector: 'app-view-comics',
  imports: [],
  templateUrl: './view-comics.component.html',
  styleUrl: './view-comics.component.css'
})
export class ViewComicsComponent {

  rowVcr = viewChild('comicRowContainer', {read: ViewContainerRef});
  
  constructor(private comicService : ComicServiceService, private csvService : CsvConverterService) {};
  
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

      // destroy the row when it receives the emitted "delete" function
      ref?.instance.delete.subscribe(() => {
        ref?.destroy();
      });
    }
  }

  toSpreadsheet()
  {
    this.csvService.exportAsExcelFile(this.comicService.getComicsArray(), "comics");
  }

}
