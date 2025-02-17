import { Component } from '@angular/core';
import { MyComicRowComponent } from "../my-comic-row/my-comic-row.component";

@Component({
  selector: 'app-view-comics',
  imports: [MyComicRowComponent],
  templateUrl: './view-comics.component.html',
  styleUrl: './view-comics.component.css'
})
export class ViewComicsComponent {

}
