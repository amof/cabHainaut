import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Magazine } from 'src/app/share/models/magazine';
import { MagazineService } from 'src/app/share/services/magazine.service';

@Component({
  selector: 'app-rocglace',
  templateUrl: './rocglace.component.html',
  styleUrls: ['./rocglace.component.scss']
})
export class RocglaceComponent implements OnInit {

  magazines: {};
  errMess: string;

  constructor(private magazineService: MagazineService) { }

  ngOnInit(): void {
    this.magazineService.getMagazines().subscribe(magazines =>
      { this.magazines = magazines.reduce((groups, magazine) => {
        const date = magazine.date.toDate().getUTCFullYear();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(magazine as Magazine);
        return groups;
      }, {});
        console.log(this.magazines);
      }, errmess => this.errMess = errmess as any
    );
  }

  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

}
