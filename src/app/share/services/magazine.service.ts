import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Magazine } from '../models/magazine';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  constructor(private afs: AngularFirestore) { }

  getMagazines(): Observable<Magazine[]> {
    return this.afs.collection<Magazine>('roc_glace', ref => ref.orderBy('title', 'asc')).snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Magazine;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      });
    }));
  }

}
