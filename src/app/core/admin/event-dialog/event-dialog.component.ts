import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../../share/models/event';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaService } from 'src/app/share/services/agenda.service';
import { Observable } from 'rxjs';
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
  buttonSend = 'Ajouter';
  windowTitle = 'Ajouter nouvel évènement';

  uploadingImg = false;
  uploadProgress: Observable<number>;
  uploadMode: ProgressSpinnerMode = 'determinate';
  uploadText = '';
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Event,
              private agendaService: AgendaService) {
      this.eventReceived = data;
      if (Object.keys(this.eventReceived).length !== 0) {
        this.buttonSend = 'Mettre à jour';
        this.windowTitle = 'Mettre à jour: ' + this.eventReceived.title;
      }
      console.log(this.eventReceived);
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void
  {
    // Check if it is a new event or modifying an existing event
    let eventDateStartValue = new Date();
    let eventDateEndValue = new Date();
    let imgFile = null;
    if (this.eventReceived.eventDateStart) {
      eventDateStartValue = new Date(this.eventReceived.eventDateStart.seconds * 1000);

    }
    if (this.eventReceived.eventDateStart) {
      eventDateEndValue = new Date(this.eventReceived.eventDateEnd.seconds * 1000);
    }
    if (this.eventReceived.imgUrl) {
      imgFile = new File([''], this.eventReceived.imgUrl);
    }

    // Applying to the formgroup
    this.eventForm = this.fb.group({
      title: [this.eventReceived.title, Validators.required],
      description: [this.eventReceived.description, Validators.required],
      contactMail: [this.eventReceived.contactMail, Validators.required],
      contactPhone: [this.eventReceived.contactPhone, Validators.required],
      contactPerson: [this.eventReceived.contactPerson, Validators.required],
      register: [this.eventReceived.register],
      eventDateStart: [eventDateStartValue, Validators.required],
      eventDateEnd: [eventDateEndValue, Validators.required],
      eventLocation: [this.eventReceived.eventLocation, Validators.required],
      imgFile: [imgFile]
    });
  }

  onSend(): void {
    // Check if the image from eventReceived has to be deleted
    // If the user re-select same image, no way to know -> deleted + re-uploaded
    if (this.eventForm.value.imgFile === null && this.eventReceived.imgUrl !== null) {
      this.agendaService.deleteImage(this.eventReceived.imgUrl);
    }

    // If there is an image, upload it
    if (this.eventForm.value.imgFile !== null && this.eventForm.value.imgFile.name !== this.eventReceived.imgUrl)
    {
      this.uploadText = 'Envoi de l\'image au serveur';
      this.uploadingImg = true;
      const ref = this.agendaService.createReference();
      const taskUploadImg = this.agendaService.postImage(ref, this.eventForm.value.imgFile);
      this.uploadProgress = taskUploadImg.percentageChanges();
      taskUploadImg.then(() => {
        this.uploadText = 'Récupération de l\'url à partir du serveur';
        this.uploadMode = 'indeterminate';
        ref.getDownloadURL().toPromise().then(imgUrl => {
          this.eventForm.value.imgUrl = imgUrl;
          delete this.eventForm.value.imgFile;
          this.dialogRef.close(this.eventForm.value);
        });
      });
    } else {  // Otherwise, just close the window
      // Check if an image has been set in the object received
      // If yes, imgUrl path is taken from object received, otherwise null
      if (this.eventForm.value.imgFile !== null) {
        this.eventForm.value.imgUrl = this.eventReceived.imgUrl;
      } else {
        this.eventForm.value.imgUrl = null;
      }
      delete this.eventForm.value.imgFile;

      this.dialogRef.close(this.eventForm.value);
    }
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  removeImageFile(): void {
    this.eventForm.get('imgFile').setValue(null);
  }

}
