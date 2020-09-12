import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../share/services/agenda.service';
import { Event } from '../../share/models/event';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  events: Event[];
  errMess: string;

  constructor(private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.agendaService.getEvents().subscribe(events =>
      this.events = events, errmess => this.errMess = errmess as any
    );
  }

}
