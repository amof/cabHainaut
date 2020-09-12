import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private afs: AngularFirestore) { }

  getEvents(): Observable<Event[]> {
    return this.afs.collection<Event>('agenda', ref => ref.orderBy('date', 'asc')).snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Event;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      });
    }));
  }

  getEvent(id: string): Observable<Event> {
    return this.afs.doc<Event>('agenda/' + id).snapshotChanges()
    .pipe(map(action => {
        const data = action.payload.data() as Event;
        const _id = action.payload.id;
        return { _id, ...data };
      }));
  }

  getNextEvent(): Observable<Event> {
    return this.afs.collection<Event>('agenda', ref => ref.orderBy('date', 'asc')).snapshotChanges()
    .pipe(map(actions => {
      const data = actions[0].payload.doc.data() as Event;
      const _id = actions[0].payload.doc.id;
      return { _id, ...data };
    }));
  }
}
