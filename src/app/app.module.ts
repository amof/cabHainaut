import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Ngx Quill
import { QuillModule } from 'ngx-quill';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';

// Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// DateTime-Picker
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

// My components
import { HomeComponent } from './core/home/home.component';
import { LandeliesComponent } from './core/landelies/landelies.component';
import { AgendaComponent } from './core/agenda/agenda.component';
import { AgendaDetailComponent } from './core/agenda-detail/agenda-detail.component';
import { TeamComponent } from './core/team/team.component';
import { PhotosComponent } from './core/photos/photos.component';
import { MainNavComponent } from './core/main-nav/main-nav.component';
import { AdminComponent } from './core/admin/admin.component';
import { LoginComponent } from './core/login/login.component';
import { ConfirmDialogComponent } from './share/components/confirm-dialog/confirm-dialog.component';
import { NewsDialogComponent } from './core/admin/news-dialog/news-dialog.component';
import { EventDialogComponent } from './core/admin/event-dialog/event-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandeliesComponent,
    AgendaComponent,
    AgendaDetailComponent,
    TeamComponent,
    PhotosComponent,
    MainNavComponent,
    AdminComponent,
    LoginComponent,
    ConfirmDialogComponent,
    NewsDialogComponent,
    EventDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    LeafletModule,
    MatCardModule,
    IvyCarouselModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSidenavModule,
    LayoutModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFirestoreModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    AngularFireAuthModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    AngularFireStorageModule,
    NgxMatFileInputModule,
    QuillModule.forRoot({
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
