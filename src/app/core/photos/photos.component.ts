import { Component, OnInit } from '@angular/core';

import { PhotosService } from '../../share/services/photos.service';
import { Photo } from '../../share/models/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  images = [
    {path: 'https://firebasestorage.googleapis.com/v0/b/cab-hainaut.appspot.com/o/DSCF4067%20(Copy).JPG?alt=media&token=b5e3d4f7-8c59-4dcc-b6c4-b30c8dec3167'},
    {path: 'https://firebasestorage.googleapis.com/v0/b/cab-hainaut.appspot.com/o/DSCF3921%20(Copy).JPG?alt=media&token=6b531f82-30d8-4011-b54e-a0a3a75ed1d2'},
    {path: 'https://firebasestorage.googleapis.com/v0/b/cab-hainaut.appspot.com/o/DSCF4066%20(Copy).JPG?alt=media&token=bf2266b3-8cbb-4f16-a5f8-e5266ba35958'}
  ];
  photos: Photo[];
  errMess: string;

  constructor(private photoService: PhotosService) { }

  ngOnInit(): void {
    this.photoService.getNews().subscribe(photos => this.photos = photos, errmess => this.errMess = errmess as any);
  }

}
