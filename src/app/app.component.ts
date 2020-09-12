import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHome, faCalendarAlt, faMountain, faNewspaper, faImages, faHandsHelping} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cabHainautWebsite';
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              private faLibrary: FaIconLibrary) {
    iconRegistry.addSvgIcon(
        'cab',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/cab_white.svg'));
    faLibrary.addIcons(faHome, faCalendarAlt, faMountain, faNewspaper, faImages, faHandsHelping);

  }

}
