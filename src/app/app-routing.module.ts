import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LandeliesComponent } from './core/landelies/landelies.component';
import { AgendaComponent } from './core/agenda/agenda.component';
import { AgendaDetailComponent } from './core/agenda-detail/agenda-detail.component';
import { TeamComponent } from './core/team/team.component';
import { PhotosComponent } from './core/photos/photos.component';
import { AdminComponent } from './core/admin/admin.component';
import { LoginComponent } from './core/login/login.component';

import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToAdmin = () => redirectLoggedInTo(['admin']);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'landelies', component: LandeliesComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'agenda/:id', component: AgendaDetailComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'team', component: TeamComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAdmin } },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
