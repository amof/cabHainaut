import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../share/components/confirm-dialog/confirm-dialog.component';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';

import { NewsService } from '../../share/services/news.service';
import { News } from '../../share/models/news';
import { AgendaService } from 'src/app/share/services/agenda.service';
import { Event } from '../../share/models/event';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  news: News[];
  displayedColumnsNews: string[] = ['date', 'title', 'actions'];
  dataSourceNews = new MatTableDataSource<News>();

  events: Event[];
  displayedColumnsEvents: string[] = ['date', 'title', 'actions'];
  dataSourceEvents = new MatTableDataSource<Event>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private newsService: NewsService,
              private agendaService: AgendaService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe( news => {
      // workaround to not update if the server has not yet timestamped
      let updateListOfNews = true;
      news.forEach(element => {
        if (element.createdAt === null) {
          updateListOfNews = false;
        }
      });
      if (updateListOfNews === true)
      {
        console.log(news);
        this.news = news;
        this.dataSourceNews = new MatTableDataSource<News>(this.news);
        this.dataSourceNews.paginator = this.paginator;
      }
    });

    this.agendaService.getEvents().subscribe(events => {
        console.log(events);
        this.events = events;
        this.dataSourceEvents = new MatTableDataSource<Event>(this.events);
        this.dataSourceEvents.paginator = this.paginator;
    });
  }

  addNews(): void {
    const dialogRef = this.dialog.open(NewsDialogComponent, {
      height: '95%',
      width: '100%',
      data: {} as News
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.newsService.postNews(dialogResult as News);
      }
    });
  }

  editNews(news: News): void {

    const dialogRef = this.dialog.open(NewsDialogComponent, {
      height: '95%',
      width: '100%',
      data: news
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.newsService.updateNews(news._id, dialogResult as News);
      }
    });
  }

  deleteNews(news: News): void {
    const message = 'Voulez-vous supprimer la news \'' + news.title + '\' ?';

    const dialogData = new ConfirmDialogModel('Confirmer la suppression', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.newsService.deleteNews(news._id);
      }
    });
  }

  addNewEvent(): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      height: '95%',
      width: '100%',
      data: {} as Event
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.agendaService.postEvent(dialogResult as Event);
      }
    });
  }

  editEvent(event: Event): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      height: '95%',
      width: '100%',
      data: event
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.agendaService.updateEvent(event._id, dialogResult as Event);
      }
    });
  }

  deleteEvent(event: Event): void {
    const message = 'Voulez-vous supprimer l\'évènement \'' + event.title + '\' ?';

    const dialogData = new ConfirmDialogModel('Confirmer la suppression', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.agendaService.deleteEvent(event);
      }
    });
  }
}
