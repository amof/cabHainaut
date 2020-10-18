import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHome, faCalendarAlt, faMountain, faNewspaper, faImages, faHandsHelping} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private faLibrary: FaIconLibrary) {
iconRegistry.addSvgIcon(
'cab',
sanitizer.bypassSecurityTrustResourceUrl('assets/img/cab_white.svg'));
faLibrary.addIcons(faHome, faCalendarAlt, faMountain, faNewspaper, faImages, faHandsHelping);

}


}