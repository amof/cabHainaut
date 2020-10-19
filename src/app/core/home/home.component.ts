import { Component, OnInit } from '@angular/core';

import { AgendaService } from '../../share/services/agenda.service';
import { Event } from '../../share/models/event';

import { NewsService } from '../../share/services/news.service';
import { News } from '../../share/models/news';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: Event[];
  nextEvent: Event;
  news: News[];
  errMess: string;
  MAX_EVENTS = 6;

  constructor(private agendaService: AgendaService,
              private newsService: NewsService,
              private faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faChevronRight);
  }

  ngOnInit(): void {
    this.agendaService.getEvents().subscribe( events => {
      this.events = events.slice(0, this.MAX_EVENTS);
      this.nextEvent = this.events.shift(); }, errmess => this.errMess = errmess as any);
    this.newsService.getNews().subscribe(news => this.news = news, errmess => this.errMess = errmess as any);
  }


}
