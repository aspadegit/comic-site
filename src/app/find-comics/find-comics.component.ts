import { Component, OnInit, Signal, viewChild, ViewContainerRef, WritableSignal, ComponentRef } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {signal} from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-find-comics',
  imports: [NgbDropdownModule],
  templateUrl: './find-comics.component.html',
  styleUrl: './find-comics.component.css'
})

@Injectable({providedIn: 'root'})
export class FindComicsComponent implements OnInit {

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
    let apiFullUrl:string = "/api/";
    apiFullUrl = apiFullUrl.concat("search/?api_key=");
    apiFullUrl = apiFullUrl.concat(environment.apiKey);
    apiFullUrl = apiFullUrl.concat("&format=json&resources=volume&query=Transformers")
    this.http.get(`${apiFullUrl}`, {
   
    }).subscribe( data => {
      console.log(data);
    })
  }

  ngOnInit(): void {

      this.#filterDropdownRef = this.vcr()?.createComponent(DropdownComponent);
      this.setupDropdownComponent(this.#filterDropdownRef, ['Name', 'Publisher'], "Search By");

      this.#sortDropdownRef = this.vcr()?.createComponent(DropdownComponent);
      this.setupDropdownComponent(this.#sortDropdownRef, ['Name', 'Publisher', 'Date'], "Sort Results By");
      
      console.log("api url " + environment.apiUrl);
  }

}

