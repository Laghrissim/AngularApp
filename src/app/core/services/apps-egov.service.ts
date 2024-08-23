import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppsEgovService {
  getAppsData() {
    return [
          {
        nom: 'E-PARAPHEUR',
        num: 1101,
        motif: 'Gestion du courriers administratifs',
        description:
          'Découvrez E-parapheur, la solution innovante pour dématérialiser, sécuriser et simplifier vos démarches administratives.',
        details: ' ',
        backgroundImage: '/assets/images/bg-eparapheur.svg',
      },

      {
        nom: 'Chikaya.ma',
        num: 1736,
        motif: 'Gestion des réclamations',
        description:
          'Découvrez CHIKAYA, la Plateforme Nationale de Gestion des réclamations, des suggestions et des observations émanant du citoyen, gagnez en efficacité et en transparence et réduisez les délais de traitement de vos réclamations.',
        details: ' ',
        backgroundImage: '/assets/images/bg-chikaya.svg',
      },

      {
        nom: 'RDV',
        num: 1101,
        motif:
          ' Télé-Accueil, la solution innovante pour la prise des rendez-vous administratifs.',
        description:
          "<p>La solution, qui est développée par l'Agence de Développement du Digital (ADD), permet aux administrations et organismes publics de :</p>\n" +
          '<ul>\n' +
          '  <li>Dématérialiser le processus de prise des Rendez-vous ;</li>\n' +
          "  <li>Optimiser l'organisation et la gestion des processus métiers internes ;</li>\n" +
          '  <li>Faciliter les échanges entre les administrations et les citoyens.</li>\n' +
          '</ul>\n',
        details: ' ',
        backgroundImage: '/assets/images/bg-rdv.svg',
      },

      {
        nom: 'Watiqa',
        num: 2736,
        motif: 'Gestion des courriers administratifs',
        description:
          'Découvrez E-parapheur, la solution innovante pour dématérialiser, sécuriser et simplifier vos démarches administratives.',
        details: ' ',
        backgroundImage: '/assets/images/bg-watiqa.svg',
      },
    ];
  }

  getAppsMini() {
    return Promise.resolve(this.getAppsData().slice(0, 5));
  }

  getAppsSmall() {
    return Promise.resolve(this.getAppsData().slice(0, 10));
  }

  getApps() {
    return Promise.resolve(this.getAppsData());
  }
}
