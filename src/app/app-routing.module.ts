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

import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RocglaceComponent } from './core/rocglace/rocglace.component';

const redirectLoggedInToAdmin = () => redirectLoggedInTo(['admin']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'landelies', component: LandeliesComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'agenda/:id', component: AgendaDetailComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'rocglace', component: RocglaceComponent },
  { path: 'team', component: TeamComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAdmin } },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy',  enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
