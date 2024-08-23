import { Component } from '@angular/core';
import { AppsEgov } from 'src/app/core/model/apps-egov.model';
import { AppsEgovService } from 'src/app/core/services/apps-egov.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  apps !: AppsEgov[];

  responsiveOptions !: any[] ;

  constructor(private appsEgovService: AppsEgovService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.appsEgovService.getApps().then((apps) => {
      this.apps = apps;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

}
