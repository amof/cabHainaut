import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, icon } from 'leaflet';

@Component({
  selector: 'app-landelies',
  templateUrl: './landelies.component.html',
  styleUrls: ['./landelies.component.scss']
})
export class LandeliesComponent implements OnInit {

  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = marker([ 50.391797338536804, 4.358933708671993 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    })
  });

  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
    },
    overlays: {
      'Mt. Rainier Paradise Start': this.paradise,
    }
  };

  options = {
    layers: [this.streetMaps, this.paradise
    ],
    zoom: 13,
    center: latLng([ 50.391877, 4.358873 ])
  };
  constructor() { }

  ngOnInit(): void {
    this.paradise.openPopup();
  }

}
