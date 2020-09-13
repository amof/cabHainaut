import { Component, OnInit } from '@angular/core';
import { COMITE } from '../../share/models/COMITE';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  COMITE = COMITE;

  constructor() { }

  ngOnInit(): void {
  }

}
