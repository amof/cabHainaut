import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { News } from '../../../share/models/news';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent implements OnInit {
  newsForm: FormGroup;
  @ViewChild('fform') newsFormDirective;
  newsReceived: News;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<NewsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: News) {
                this.newsReceived = data;
              }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void
  {
    this.newsForm = this.fb.group({
      title: [this.newsReceived.title, Validators.required],
      content: [this.newsReceived.content, Validators.required],
    });
  }

  onSend(): void {
    this.dialogRef.close(this.newsForm.value);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
