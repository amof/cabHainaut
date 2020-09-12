import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

// Carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';

// Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// My components
import { HomeComponent } from './core/home/home.component';
import { LandeliesComponent } from './core/landelies/landelies.component';
import { AgendaComponent } from './core/agenda/agenda.component';
import { AgendaDetailComponent } from './core/agenda-detail/agenda-detail.component';
import { TeamComponent } from './core/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandeliesComponent,
    AgendaComponent,
    AgendaDetailComponent,
    TeamComponent,
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
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
