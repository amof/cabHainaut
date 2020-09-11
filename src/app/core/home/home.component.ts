import { Component, OnInit } from '@angular/core';
import { Map, MapOptions, tileLayer, latLng } from 'leaflet';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = [
    {path: 'assets/img/DSC03989.JPG'},
    {path: 'assets/img/DSC04011.JPG'}
  ]
  constructor() { }

  ngOnInit(): void {
  }


}
