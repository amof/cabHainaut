import { Component, OnInit } from '@angular/core';

import { AgendaService } from '../../share/services/agenda.service';
import { Event } from '../../share/models/event';

import { NewsService } from '../../share/services/news.service';
import { News } from '../../share/models/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nextEvent: Event;
  news: News;
  errMess: string;

  constructor(private agendaService: AgendaService,
              private newsService: NewsService) { }

  ngOnInit(): void {
    this.agendaService.getNextEvent().subscribe(event => this.nextEvent = event, errmess => this.errMess = errmess as any);
    this.newsService.getNews().subscribe(news => this.news = news[0], errmess => this.errMess = errmess as any);
  }


}
