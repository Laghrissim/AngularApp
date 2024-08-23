import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit{

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
