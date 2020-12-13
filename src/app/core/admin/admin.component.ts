import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      console.log(news);
      this.news = news;
      this.dataSource = new MatTableDataSource<News>(this.news);
      this.dataSource.paginator = this.paginator;
    });
  }

  addNews(): void {
    const dialogRef = this.dialog.open(NewsDialogComponent, {
      maxWidth: "400px",
      data: {} as News
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult);
    });
  }

  editNews(news: News): void {

    const dialogRef = this.dialog.open(NewsDialogComponent, {
      maxWidth: "400px",
      data: news
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult);
    });
  }

  deleteNews(news: News): void {
    const message = 'Voulez-vous supprimer la news \'' + news.title + '\' ?';

    const dialogData = new ConfirmDialogModel('Confirmer la suppression', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult);
    });
  }
}
