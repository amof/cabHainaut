import { Component, OnInit} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

import { AgendaService } from '../../share/services/agenda.service';
import { Event } from '../../share/models/event';

@Component({
  selector: 'app-agenda-detail',
  templateUrl: './agenda-detail.component.html',
  styleUrls: ['./agenda-detail.component.scss']
})
export class AgendaDetailComponent implements OnInit {

  event: Event;
  errMess: string;

  constructor(private route: ActivatedRoute, private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => this.agendaService.getEvent(params.id)))
    .subscribe(event => this.event = event, errmess => this.errMess = errmess as any
    );
  }

}
