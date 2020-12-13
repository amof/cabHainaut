import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { News } from '../models/news';
import { AuthService } from './auth.service';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  getNews(): Observable<News[]> {
    return this.afs.collection<News>('news').snapshotChanges() //, ref => ref.orderBy('date', 'desc')
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as News;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      });
    }));
  }

  postNews(news: News): Promise<any> {
    news.user_id = this.authService.currentUserId;
    news.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    news.updatedAt =  firebase.firestore.FieldValue.serverTimestamp();

    if (this.authService.isLoggedIn) {
      return this.afs.collection('news').add(news);
    } else {
      return Promise.reject(new Error('No User Logged In!'));
  }
}
}
