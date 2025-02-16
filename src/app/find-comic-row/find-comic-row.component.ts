import { Component } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'app-find-comic-row',
  imports: [],
  templateUrl: './find-comic-row.component.html',
  styleUrl: './find-comic-row.component.css'
})
export class FindComicRowComponent {
  name = input('Title');
  type = input('Type');
  imgUrl = input("https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/4245087-01.jpg");
  desc = input('Description');
}
