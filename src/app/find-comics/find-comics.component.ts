import { Component, OnInit, Signal, viewChild, ViewContainerRef, WritableSignal, ComponentRef, Injectable, ViewChild, ElementRef } from '@angular/core';
import { NgbDropdownModule, NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {signal} from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FindComicRowComponent } from '../find-comic-row/find-comic-row.component';
import { Comic, ComicJson, Dictionary, QueryInfo } from '../comic'
import { PaginationComponent } from '../pagination/pagination.component';


@Component({
  selector: 'app-find-comics',
  imports: [NgbDropdownModule, FormsModule, NgbPaginationModule],
  templateUrl: './find-comics.component.html',
  styleUrl: './find-comics.component.css'
})

@Injectable({providedIn: 'root'})
export class FindComicsComponent {

  comicQuery = '';
  curDropdownSelection : WritableSignal<number> = signal(0);
  
  // for pagination
  page : number = 1;
  currentResults : number[] = [];
  sortDirBool: boolean = true;
  isError: boolean = false;
  errorCode: number = 502;

  // changingOffset: changes around. initially is what is used to query the database, then is adjusted when pages change
  //queryInfo offset: the lower-bound offset used to query the database
  //cache offset: the offset returned in the HTTP response. does not change until a new query
  cache : ComicJson = {results: [], offset:0, number_of_total_results: 0};
  changingOffset: number = 0;
  queryInfo : QueryInfo = { limit: 20, resource: 'volume', sort: 'name', sortDirection: 'asc', dateStyle: 'start_year', offset:0 };
  queryNum : number = this.queryInfo.limit*5;

  constructor(private http: HttpClient){}

  // view container refs
  filterVcr = viewChild('filterContainer', {read: ViewContainerRef});
  sortVcr = viewChild('sortContainer', {read: ViewContainerRef});
  rowVcr = viewChild('comicRowContainer', {read: ViewContainerRef});

  #filterDropdownRef?: ComponentRef<DropdownComponent>;
  #sortDropdownRef?: ComponentRef<DropdownComponent>;

  ngAfterViewInit(): void {

    this.filterVcr()?.clear();
    this.sortVcr()?.clear();
    this.#filterDropdownRef = this.filterVcr()?.createComponent(DropdownComponent);
    this.setupDropdownComponent(this.#filterDropdownRef, ['Volume', 'Issue'], "Search By");

    this.#sortDropdownRef = this.sortVcr()?.createComponent(DropdownComponent);
    this.setupDropdownComponent(this.#sortDropdownRef, ['Name', 'Date'], "Sort By");
    
  }

  setupDropdownComponent(ref : ComponentRef<DropdownComponent> | undefined, dropdownItems : string[], caption : string)
  {
    ref?.setInput('dropdownList', dropdownItems);
    ref?.setInput('caption', caption);
    
  }

  radioButtonChange()
  {
    this.sortDirBool = !this.sortDirBool;
  }
 
  onClickDropdownItem(index :number) : void
  {
    this.curDropdownSelection.set(index);
  }

  getData() : void
  {
    
    //grab the selections from the dropdowns
    this.queryInfo.resource = this.#filterDropdownRef?.instance.getCurrentDropdownString().toLowerCase()!;
    this.queryInfo.sort = this.#sortDropdownRef?.instance.getCurrentDropdownString().toLowerCase()!;

    this.queryInfo.dateStyle = (this.queryInfo.resource == 'volume')? 'start_year' : 'cover_date';
    //volume & issue have different fields for date
    if(this.queryInfo.sort == 'date')
    {
      this.queryInfo.sort = this.queryInfo.dateStyle;
    }
    
    let direction = "asc";
    if(!this.sortDirBool)
      direction = "desc";

    // build API string
    let apiFullUrl:string = `/api/${this.queryInfo.resource}s/?api_key=${environment.apiKey}&format=json&filter=name:${this.comicQuery}&limit=${this.queryNum}&offset=${this.queryInfo.offset}&sort=${this.queryInfo.sort}:${direction}`;

    //query the api
    this.http.get<ComicJson>(`${apiFullUrl}`, {
      responseType: 'json',
      observe: 'response'
    }).pipe().subscribe( res  => {
      if(!res.ok)
      {
        this.errorCode = res.status;
        console.log(`Comic Vine ${this.errorCode} Error.`);
        this.isError = true;

        
      }
      else
      {
        this.isError = false;
        this.cache = res.body!;
        this.createAllComicRows();
      }
    });
  }
  
  createAllComicRows() : void
  {
    console.log(this.cache);
    let data = this.cache;

    // clear the rows
    this.currentResults = [];
    this.rowVcr()?.clear();

    //get the data
    let results = data.results;
    console.log(data.results);

    // top pagination
    this.setupPagination();

    // loop through & instantiate new result rows
    let rowArrayOffset = (this.changingOffset - this.cache.offset); // ensures that i stays [0, 100)
    let numRows = Math.min(this.queryInfo.limit + rowArrayOffset, results.length); //calculates the upper bound for the 20 rows visible
    for(let i = rowArrayOffset; i < numRows; i++)
    {
      this.createComicRow(results[i]);
    }

    // bottom pagination
    this.setupPagination();
  }



  setupPagination() : void
  {
    let ref = this.rowVcr()?.createComponent(PaginationComponent);

    ref?.instance.setup(this.page, this.queryInfo.limit, this.cache);

    ref?.instance.updatePage.subscribe( eventData => {
      let shouldRequery : boolean = eventData[0];
      let newPage: number = eventData[1];

      // makes sure offset is pos / negative correctly
      let pageDiff = newPage - this.page;
      let newOffset : number = this.changingOffset + (this.queryInfo.limit * pageDiff);


      // clamp upper bound
      if(newOffset > this.cache.number_of_total_results)
      {
        newOffset = this.cache.number_of_total_results;
      }
      
      //clamp lower bound
      if(newOffset < 0)
      {
        newOffset = 0;
      }

      this.changingOffset = newOffset;
      this.page = newPage;

      //query
      if(shouldRequery)
      {
        //ensure query offset is a multiple of 100 (so cache has the correct number of results)
          //edge case of querying a new page that is not a multiple of 5 (e.g going from page 1 to page 23 without this would not start at the correct offset)
        if(newOffset % this.queryNum != 0)
        {
          let remainder = newOffset % this.queryNum; // how far off are we?
          this.queryInfo.offset = newOffset - remainder;
          
        }
        else
        {
          this.queryInfo.offset = newOffset;
        }
        this.getData();
      }
      //change rows & adjust page
      else
      {
        this.createAllComicRows();
      }
      

    });
  }


  createComicRow(row : any) : void
  {
 
    let ref = this.rowVcr()?.createComponent(FindComicRowComponent)

    ref?.setInput('id', row['id']);
    ref?.setInput('name', row['name']);
    ref?.setInput('desc', row['description']);
    ref?.setInput('date', row[this.queryInfo.dateStyle]);
    ref?.setInput('imgUrl', row['image']['small_url']);
    ref?.setInput('type', this.#filterDropdownRef?.instance.getCurrentDropdownString());

    this.currentResults.push(row['id']);
    

  }




}

