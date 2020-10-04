import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private afs: AngularFirestore) { }

  getNews(): Observable<Photo[]> {
    return this.afs.collection<Photo>('photos').snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Photo;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      });
    }));
  }
}
