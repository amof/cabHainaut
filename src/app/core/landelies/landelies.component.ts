import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, icon, polyline, Map, point } from 'leaflet';

@Component({
  selector: 'app-landelies',
  templateUrl: './landelies.component.html',
  styleUrls: ['./landelies.component.scss']
})
export class LandeliesComponent implements OnInit {

  map: Map;
  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Marker for base of Landelies
  landelies = marker([ 50.391797338536804, 4.358933708671993 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    })
  }).bindPopup('Site d\'escalade de Landelies');

  parkingCarriere = marker([ 50.394102724594845, 4.355886924183849 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    })
  }).bindPopup('Parking Carrière');

  parkingStandTir = marker([ 50.38257696002369, 4.353554655772931 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    })
  }).bindPopup('Parking Stand de Tir');

  routeFromCarriere = polyline([
    [ 50.394102724594845, 4.355886924183849 ],
    [ 50.39269352534264,  4.356439371568408 ],
    [ 50.39265, 4.3563 ],
    [ 50.39244, 4.35626 ],
    [ 50.39207, 4.35607 ],
    [ 50.39165, 4.35622 ],
    [ 50.39127, 4.35693 ],
    [ 50.39165, 4.35796 ],
    [ 50.391797338536804, 4.358933708671993 ]
  ]);

  routeFromStandTir = polyline([
    [ 50.38257696002369, 4.353554655772931 ],
    [ 50.38328, 4.35247 ],
    [ 50.38448, 4.35155 ],
    [ 50.38586, 4.35168 ],
    [ 50.38698, 4.35173 ],
    [ 50.38806, 4.35231 ],
    [ 50.38914, 4.35333 ],
    [ 50.39038, 4.35375 ],
    [ 50.39084, 4.35452 ],
    [ 50.39106, 4.35539 ],
    [ 50.39165, 4.35622 ],
    [ 50.39127, 4.35693 ],
    [ 50.39165, 4.35796 ],
    [ 50.391797338536804, 4.358933708671993 ]
  ]);

  options = {
    layers: [this.streetMaps, this.landelies, this.parkingCarriere, this.parkingStandTir, 
      this.routeFromCarriere, this.routeFromStandTir
    ],
    zoom: 13,
    center: latLng([ 50.391877, 4.358873 ])
  };
  constructor() { }

  ngOnInit(): void {
  }

  onMapReady(map: Map): void {
    this.map = map;
    setTimeout(() => {
      map.invalidateSize();
    });
    map.fitBounds([
      [ 50.394102724594845, 4.355886924183849 ],
      [ 50.38257696002369, 4.353554655772931 ]
  ], {
      padding: point(15, 15),
      maxZoom: 15,
      animate: true
    });
  }
  refreshMap(event): void {
    console.log(event);
    this.map.invalidateSize();
    this.map.fitBounds([
      [ 50.394102724594845, 4.355886924183849 ],
      [ 50.38257696002369, 4.353554655772931 ]
  ], {
      padding: point(15, 15),
      maxZoom: 15,
      animate: true
    });
  }

}
