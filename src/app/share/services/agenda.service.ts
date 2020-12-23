import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import firebase from 'firebase/app';

import { Event } from '../models/event';
import { uid } from 'uid';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private afs: AngularFirestore,
              private afStorage: AngularFireStorage,
              private authService: AuthService) { }

  getEvents(): Observable<Event[]> {
    return this.afs.collection<Event>('agenda', ref =>
    ref.orderBy('event_date_start', 'asc').where('event_date_start', '>', firebase.firestore.Timestamp.now())).snapshotChanges()
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

  getNextEvent(): Observable<any> {
    return this.afs.collection<Event>('agenda', ref => ref.orderBy('date', 'asc').where('date', '>', Date.now())).snapshotChanges()
    .pipe(map(actions => {
      if (actions.length > 0) {
        const data = actions[0].payload.doc.data() as Event;
        const _id = actions[0].payload.doc.id;
        return { _id, ...data };
      }
      else { return {}; }
    }));
  }

  postEvent(event: Event): Promise<any> {
    event.user_id = this.authService.currentUserId;
    event.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    event.updatedAt =  firebase.firestore.FieldValue.serverTimestamp();

    if (this.authService.isLoggedIn) {
      return this.afs.collection('agenda').add(event);
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  createReference(): AngularFireStorageReference {
    // create a reference to the storage bucket location
    return this.afStorage.ref('/agenda/' + uid(16));
  }

  postImage(ref: AngularFireStorageReference, img: File): AngularFireUploadTask {
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    return ref.put(img);
  }

}
