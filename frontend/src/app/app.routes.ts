import { Routes } from '@angular/router';
import { ImagesComponent } from './views/images/images';

export const routes: Routes = [
    { path: '', redirectTo: '/images', pathMatch: 'full' },
    { path: 'images', component: ImagesComponent },
];