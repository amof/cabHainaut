import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private afs: AngularFirestore) { }

  getNews(): Observable<News[]> {
    return this.afs.collection<News>('news').snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as News;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      });
    }));
  }
}
