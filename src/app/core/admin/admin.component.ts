import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../share/services/news.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  postForm: FormGroup;
  @ViewChild('fform') postFormDirective;

  constructor(private fb: FormBuilder,
              private newsService: NewsService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void
  {
    this.postForm = this.fb.group({
      imgurl: ['', Validators.required],
      title: ['', Validators.required],
      content: [''],
    });
  }
  onSubmit(): void {
    console.log(this.postForm.value);
    this.newsService.postNews(this.postForm.value);
  }
}
