import { Component, input } from '@angular/core';
import { signal } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown',
  imports: [NgbDropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  dropdownList = input(['__NotSet__']);
  caption = input('__Caption__');
  curDropdownSelection = signal(0);

  
  onClickDropdownItem(index :number) : void
  {
    this.curDropdownSelection.set(index);
  }
}
