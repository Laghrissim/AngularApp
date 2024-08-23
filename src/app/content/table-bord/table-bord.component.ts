import { Component } from '@angular/core';

@Component({
  selector: 'app-table-bord',
  templateUrl: './table-bord.component.html',
  styleUrls: ['./table-bord.component.scss'],
})
export class TableBordComponent {
  cards = [
    {
      id: 'c1',
      title: 'Watiqa',
      subtitle: 'Gestion du courriers administratifs',
    },
    { id: 'c2', title: 'Chikaya.ma', subtitle: 'Gestion des réclamations' },
    {
      id: 'c3',
      title: 'E-Parapheur',
      subtitle: 'Gestion du courriers administratifs',
    },
    { id: 'c4', title: 'RDV', subtitle: 'Gestion du courriers administratifs' },
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
