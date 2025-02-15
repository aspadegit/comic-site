import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FindComicsComponent } from './find-comics/find-comics.component';
import { ViewComicsComponent } from './view-comics/view-comics.component';

export const routes: Routes = [
    { path: 'find-comics', component:FindComicsComponent},
    { path: 'my-comics', component:ViewComicsComponent},
    { path: '', component: HomeComponent}
];
