import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewsService } from '../../share/services/news.service';
import { News } from '../../share/models/news';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../share/components/confirm-dialog/confirm-dialog.component';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  news: News[];

  displayedColumns: string[] = ['date', 'title', 'actions'];
  dataSource = new MatTableDataSource<News>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private newsService: NewsService,
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
        this.dataSource = new MatTableDataSource<News>(this.news);
        this.dataSource.paginator = this.paginator;
      }

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
}
