import { Component, OnInit, Signal, viewChild, ViewContainerRef, WritableSignal, ComponentRef, Injectable } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {signal} from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-comics',
  imports: [NgbDropdownModule, FormsModule],
  templateUrl: './find-comics.component.html',
  styleUrl: './find-comics.component.css'
})

@Injectable({providedIn: 'root'})
export class FindComicsComponent implements OnInit {

  comicQuery = '';
  curDropdownSelection : WritableSignal<number> = signal(0);

  constructor(private http: HttpClient){}

  vcr = viewChild('container', {read: ViewContainerRef});
  #filterDropdownRef?: ComponentRef<DropdownComponent>;
  #sortDropdownRef?: ComponentRef<DropdownComponent>;

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

    //volume & issue have different fields for date
    if(sort == 'date')
    {
      if(resource == 'volume')
      {
        sort = 'start_year'
      }
      else
      {
        sort = 'cover_date';
      }
    }
    
    let apiFullUrl:string = `/api/${resource}s/?api_key=${environment.apiKey}&format=json&filter=name:${this.comicQuery}&limit=25&sort=${sort}:desc`;


    this.http.get(`${apiFullUrl}`, {
      
    }).subscribe( data => {
      console.log(data);
    })
  }

  ngOnInit(): void {

      this.#filterDropdownRef = this.vcr()?.createComponent(DropdownComponent);
      this.setupDropdownComponent(this.#filterDropdownRef, ['Volume', 'Issue'], "Search By");

      this.#sortDropdownRef = this.vcr()?.createComponent(DropdownComponent);
      this.setupDropdownComponent(this.#sortDropdownRef, ['Name', 'Date'], "Sort Results By");
      
  }

}

