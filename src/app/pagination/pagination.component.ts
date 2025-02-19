import { Component, ComponentRef, output, viewChild } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ComicJson } from '../comic';

@Component({
  selector: 'app-pagination',
  imports: [NgbPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  page = 1;
  collectionSize = 10;
  limit : number = 20;
  updatePage = output<any[]>();
  comicJson : ComicJson = {results: [], offset:0, number_of_total_results: 0};

  setup(page : number, limit:number, comicJson : ComicJson)
  {
    this.page = page;
    this.comicJson = comicJson;
    this.limit = limit;

    let numPages = Math.ceil(comicJson.number_of_total_results / limit);

    this.collectionSize = numPages*10;


  }

  
  // emits [shouldRequery, newPage]
  onPageChange(newPage : any)
  {
    let initPage = this.page;
    
    // the starting page last queried
    let pageOffset = Math.ceil((this.comicJson.offset +1) / this.limit); // +1 to account for boundaries (0/20 = 0, must be 1/20 to be page 1)
    
    // the pages starting where another query will be needed
    let pageUpper = pageOffset + 5; 
    let pageLower = pageOffset - 5;

    this.page = newPage;

    console.log("newPage : ", newPage);
    console.log("upper: " + pageUpper + " | lower: "+ pageLower);

    // new page passes the boundaries
    if(newPage >= pageUpper || newPage < pageOffset)
    {
      // requery
      this.updatePage.emit([true, newPage]);

    }
    // don't requery
    else
    {
      this.updatePage.emit([false, newPage]);

    }

  
  }

}
