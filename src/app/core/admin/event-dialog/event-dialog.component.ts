import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../../share/models/event';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaService } from 'src/app/share/services/agenda.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {
  eventForm: FormGroup;
  eventReceived: Event;
  @ViewChild('fform') eventFormDirective;

  uploadingImg = false;
  uploadProgress: Observable<number>;
  uploadMode: ProgressSpinnerMode = 'determinate';
  uploadText = '';
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Event,
              private agendaService: AgendaService) {
      this.eventReceived = data;
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void
  {
    this.eventForm = this.fb.group({
      title: [this.eventReceived.title, Validators.required],
      description: [this.eventReceived.description, Validators.required],
      contact_mail: [this.eventReceived.contact_mail, Validators.required],
      contact_phone: [this.eventReceived.contact_phone, Validators.required],
      register: [this.eventReceived.register],
      event_date_start: [this.eventReceived.event_date_start, Validators.required],
      event_date_end: [this.eventReceived.event_date_end, Validators.required],
      event_location: [this.eventReceived.event_date_end, Validators.required],
      img: [this.eventReceived.img]
    });
  }

  onSend(): void {
    this.uploadText = 'Envoi de l\'image au serveur';
    this.uploadingImg = true;

    const ref = this.agendaService.createReference();
    const taskUploadImg = this.agendaService.postImage(ref, this.eventForm.value.img);
    this.uploadProgress = taskUploadImg.percentageChanges();
    taskUploadImg.then(() => {
      this.uploadText = 'Récupération de l\'url à partir du serveur';
      this.uploadMode = 'indeterminate';
      console.log(this.uploadText);
      ref.getDownloadURL().toPromise().then(imgUrl => {
        console.log(imgUrl);
        this.eventForm.value.img = imgUrl;
        this.dialogRef.close(this.eventForm.value);
      });
    });
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
