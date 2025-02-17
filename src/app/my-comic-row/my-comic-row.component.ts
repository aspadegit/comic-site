import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbRatingModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-comic-row',
  imports: [NgbDropdownModule, NgbRatingModule, NgbCollapseModule, FormsModule],
  templateUrl: './my-comic-row.component.html',
  styleUrl: './my-comic-row.component.css'
})
export class MyComicRowComponent {
  rating = 0;
  isCollapsed = true;
  userNotes = '';
}
