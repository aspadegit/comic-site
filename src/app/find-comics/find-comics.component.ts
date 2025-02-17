import { Component, OnInit, Signal, viewChild, ViewContainerRef, WritableSignal, ComponentRef, Injectable, ViewChild } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {signal} from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FindComicRowComponent } from '../find-comic-row/find-comic-row.component';
import { Comic, ComicJson, Dictionary } from '../comic'


@Component({
  selector: 'app-find-comics',
  imports: [NgbDropdownModule, FormsModule],
  templateUrl: './find-comics.component.html',
  styleUrl: './find-comics.component.css'
})

@Injectable({providedIn: 'root'})
export class FindComicsComponent {

  comicQuery = '';
  curDropdownSelection : WritableSignal<number> = signal(0);

  constructor(private http: HttpClient){}

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

 
  onClickDropdownItem(index :number) : void
  {
    this.curDropdownSelection.set(index);
  }

  getData() : void
  {
    //grab the selections from the dropdowns
    let resource = this.#filterDropdownRef?.instance.getCurrentDropdownString().toLowerCase();
    let sort = this.#sortDropdownRef?.instance.getCurrentDropdownString().toLowerCase();

    let date_style = (resource == 'volume')? 'start_year' : 'cover_date';
    //volume & issue have different fields for date
    if(sort == 'date')
    {
      sort = date_style;
    }
    
    // build API string
    let apiFullUrl:string = `/api/${resource}s/?api_key=${environment.apiKey}&format=json&filter=name:${this.comicQuery}&limit=25&sort=${sort}:asc`;

    //query the api
    this.http.get<ComicJson>(`${apiFullUrl}`, {
      responseType: 'json',
      observe: 'response'
    }).pipe().subscribe( res  => {
      this.createAllComicRows(res.body!, resource!, date_style);
    });
  }
  
  createAllComicRows(data : ComicJson, type : string, date_style: string) : void
  {
    // clear the rows
    this.rowVcr()?.clear();
    let results = data.results;
    console.log(data.results);

    // loop through & instantiate new result rows
    for(let i = 0; i < results.length; i++)
    {
      this.createComicRow(results[i], type, date_style);
    }
  }

  createComicRow(row : any, _type :string, date_style: string)
  {
 
    let ref = this.rowVcr()?.createComponent(FindComicRowComponent)

    ref?.setInput('id', row['id']);
    ref?.setInput('name', row['name']);
    ref?.setInput('desc', row['description']);
    ref?.setInput('date', row[date_style]);
    ref?.setInput('imgUrl', row['image']['small_url']);
    ref?.setInput('type', this.#filterDropdownRef?.instance.getCurrentDropdownString());
    

  }




}

