import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../../share/services/news.service';
import { News } from '../../../share/models/news';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent implements OnInit {
  postForm: FormGroup;
  @ViewChild('fform') postFormDirective;
  newsReceived: News;

  constructor(private fb: FormBuilder,
              private newsService: NewsService,
              public dialogRef: MatDialogRef<NewsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: News) {
                this.newsReceived = data;
              }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void
  {
    this.postForm = this.fb.group({
      imgurl: ['', Validators.required],
      title: [this.newsReceived.title, Validators.required],
      content: [this.newsReceived.content],
    });
  }

  onSubmit(): void {
    console.log(this.postForm.value);
    this.newsService.postNews(this.postForm.value);
  }

}
