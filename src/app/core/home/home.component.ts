import { Component, OnInit } from '@angular/core';

import { AgendaService } from '../../share/services/agenda.service';
import { Event } from '../../share/models/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = [
    {path: 'assets/img/DSC03989.JPG'},
    {path: 'assets/img/DSC04011.JPG'}
  ];

  nextEvent: Event;
  errMess: string;

  constructor(private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.agendaService.getNextEvent().subscribe(event => this.nextEvent = event, errmess => this.errMess = errmess as any);
  }


}
