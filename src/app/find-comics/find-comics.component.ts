import { Component, OnInit, Signal, viewChild, ViewContainerRef, WritableSignal, ComponentRef } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {signal} from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { inject } from '@angular/core';

@Component({
  selector: 'app-find-comics',
  imports: [NgbDropdownModule],
  templateUrl: './find-comics.component.html',
  styleUrl: './find-comics.component.css'
})


export class FindComicsComponent implements OnInit {

  curDropdownSelection : WritableSignal<number> = signal(0);

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

  ngOnInit(): void {

      this.#filterDropdownRef = this.vcr()?.createComponent(DropdownComponent);
      this.setupDropdownComponent(this.#filterDropdownRef, ['Name', 'Publisher'], "Search By");

      this.#sortDropdownRef = this.vcr()?.createComponent(DropdownComponent);
      this.setupDropdownComponent(this.#sortDropdownRef, ['Name', 'Publisher', 'Date'], "Sort Results By");
  }

}

