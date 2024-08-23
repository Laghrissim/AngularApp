import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {SolutionDto} from "../../core/dto/solution-dto";
import {SolutionService} from "../../core/services/solution.service";
import {RequestDto} from "../../core/dto/request-dto";
import {ConfirmationService, MessageService} from "primeng/api";
import {ProjectService} from "../../core/services/project.service";
import {Utilisateur} from "../../core/model/utilisateur.model";
import {AuthService} from "../../core/services/auth.service";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-task',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
})
export class SolutionComponent implements OnInit{



    constructor(public sanitizer: DomSanitizer,
                private route: ActivatedRoute,
                private solutionService :SolutionService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private router: Router,
                private projectService: ProjectService,
                private authService: AuthService,
                private userService:UserService,
                ) {
    }
    solution:SolutionDto | null =null
    id!: number;
    isLoggedIn: boolean = false;
   user:Utilisateur = {} as Utilisateur;
    isActive: number = 0;
    projects: any[] = [{
        id: 1,
        title: "E-Parapheur",
        background: "assets/images/GroupBac.svg",
        sousTitle: "Accompagnement des Établissements Publics dans leur transformation digitale, définition de la stratégie numérique et accompagnement dans les démarches de projet",
        videoLink: this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/tUP5S4YdEJo"),
        lancementDate: "Janvier, 2022",
        cible: "Administrations",
        version: "1.8",
        descriptionTitle: "Accompagnement à la transformation digitale",
        description: "Dans un monde en constante évolution numérique, les établissements publics sont confrontés à des défis majeurs pour moderniser leurs processus et offrir des services de qualité à leurs usagers. La transformation digitale est devenue essentielle pour améliorer l'efficacité opérationnelle, la transparence, et l'accessibilité des services publics. Cependant, cette transition peut être complexe et nécessite une approche stratégique et un accompagnement adapté.",
        objectif: "L'Agence de Développement du Digital, en tant qu'organisme spécialisé dans la transformation digitale, possède une expertise approfondie dans les technologies émergentes, les meilleures pratiques et les processus de gestion de projet. Notre objectif est d'assister les établissements publics dans la définition de leur stratégie numérique et de les guider à travers toutes les étapes clés de leurs projets, en mettant l'accent sur l'expression de besoin et la revue des CPS. En collaborant avec l'Agence, les établissements publics bénéficieront d'un soutien personnalisé pour définir leur vision numérique, aligner leurs objectifs stratégiques avec les nouvelles technologies et mettre en place des projets réussis. De plus, notre expertise en rédaction et en revue de CPS garantira que les exigences des projets sont clairement définies, les normes respectées et les risques minimisés.",
        elements: [
            {
                id: 'fonctions',
                title: 'Fonctions Principales',
                content: [
                    "Accompagnement à la mise en place de stratégies numériques",
                    "Évaluation de la maturité digitale et identification des axes d'amélioration",
                    "Assistance à la conception et à l'implémentation de projets de digitalisation",
                    "Formation et sensibilisation des équipes aux enjeux de la transformation digitale",
                    "Veille et conseils en matière d'innovations technologiques",
                    "Assistance au choix des solutions et prestataires adaptées à vos besoins spécifiques",
                    "Accompagnement à la rédaction et à la mise à jour des Cahiers des Prescriptions de Services (CPS)",
                    "Revue des CPS existants pour identifier les points de non-conformité avec les normes et standards de qualité en vigueur",
                    "Conseils et assistance pour l'optimisation des CPS en vue d'améliorer la qualité des services rendus",
                    "Suivi et accompagnement lors de l'audit qualité pour garantir la conformité des CPS aux exigences normatives et réglementaires."
                ]
            },
            {
                id: 'demarche',
                title: 'Démarche et étapes clés',
                content: [
                    {
                        title: 'A. Analyse des besoins',
                        steps: [
                            "Identifier les établissements publics et comprendre leurs objectifs spécifiques de transformation digitale.",
                            "Évaluer leur situation actuelle en termes de processus, de ressources et de technologies utilisées.",
                            "Analyser les besoins et les attentes des établissements publics pour définir des objectifs clairs et mesurables."
                        ]
                    },
                    {
                        title: 'B. Définition de la stratégie numérique',
                        steps: [
                            "Collaborer avec les établissements publics pour définir leur stratégie numérique, en alignant les objectifs de transformation digitale sur leur vision institutionnelle.",
                            "Élaborer un plan d'action détaillé pour la mise en œuvre de la stratégie numérique, en identifiant les initiatives prioritaires, les ressources nécessaires et les étapes clés."
                        ]
                    },
                    {
                        title: 'C. Accompagnement dans les démarches de projet',
                        steps: [
                            "Assister les établissements publics dans l'expression de leurs besoins, en les aidant à formuler des exigences claires et détaillées.",
                            "Participer à l'élaboration des cahiers des charges, en veillant à ce qu'ils intègrent les objectifs stratégiques et les exigences technologiques spécifiques.",
                            "Fournir des conseils et une expertise tout au long du cycle de vie des projets, y compris la planification, la conception, le développement, la mise en œuvre et l'évaluation."
                        ]
                    },
                    {
                        title: 'D. Revue des Cahiers des Clauses Techniques Particulières (CPS)',
                        steps: [
                            "Examiner et évaluer les CPS existants, en s'assurant de leur cohérence avec la stratégie numérique et les objectifs du projet.",
                            "Apporter des recommandations et des ajustements aux CPS pour garantir leur clarté, leur précision et leur alignement avec les normes légales et réglementaires en vigueur.",
                            "Effectuer une revue approfondie pour identifier les lacunes éventuelles et proposer des améliorations."
                        ]
                    }
                ]
            },
            {
                id: 'resume',
                title: 'En résumé',
                content: [
                    "Cet accompagnement global permettra aux établissements publics d'accélérer leur transformation digitale, d'optimiser leurs démarches de projet et de garantir la réussite de leurs initiatives, en offrant des services numériques innovants et en répondant aux attentes croissantes des citoyens et des parties prenantes."
                ]
            }
        ]
    },
      {
        id: 2,
        title: "RDV",
        background: "/assets/images/RDV-bg.svg",
        sousTitle: "Découvrez Watiqa.ma, la plateforme incontournable pour simplifier vos démarches administratives en ligne.",
        videoLink: this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/tUP5S4YdEJo"),
        lancementDate: "2011",
        cible: "les citoyens marocains",
        version: "1.8",
        descriptionTitle: "Watiqa - Le guichet électronique de commande de l’état civil.",
        description: "Watiqa.ma est un service en ligne qui offre la possibilité de commander électroniquement des documents administratifs tels que des copies intégrales ou des extraits d'acte de naissance, et de les recevoir par courrier recommandé à l'adresse de votre choix. Cette plateforme est développée en collaboration avec l'Agence de Développement du Digital, le Ministère de l'Intérieur et Barid Al-Maghrib.<br><br> Grâce à Watiqa.ma, vous pouvez effectuer vos demandes administratives à distance, sans avoir à vous déplacer physiquement aux bureaux d'état civil. Cela vous permet d'optimiser votre temps et vos déplacements, tout en bénéficiant de services administratifs transparents et sécurisés.",
        elements: [
          {
            id: 'fonctions',
            title: 'Fonctions Principales',
            content: [
              "Commande électronique de documents administratifs tels que des copies intégrales ou des extraits d'acte de naissance.",
              "Réception des documents par courrier recommandé à l'adresse de votre choix.",
              "Interface conviviale pour naviguer facilement sur la plateforme et effectuer vos demandes.",
              "Suivi en ligne de l'état d'avancement de vos dossiers."
            ]
          },
          {
            id: 'avantages',
            title: 'Avantages majeurs',
            content: [
              "Simplification des démarches administratives en permettant de les effectuer en ligne, sans avoir à se déplacer physiquement aux bureaux d'état civil.",
              "Gain de temps et d'efficacité en évitant les files d'attente et en bénéficiant d'un traitement rapide de vos demandes.",
              "Service à distance pratique et accessible, permettant de commander des documents administratifs de manière transparente.",
              "Sécurité renforcée des échanges, avec la réception des documents par courrier recommandé.",
              "Transparence et fiabilité des services administratifs offerts par la plateforme.",
              "Optimisation des déplacements en évitant des trajets inutiles pour des demandes administratives.",
              "Facilité d'utilisation grâce à une interface conviviale et intuitive.",
              "Réduction des coûts liés à la gestion des courriers et des processus administratifs.",
            ]
          },
          {
            id: 'prerequis',
            title: 'Prérequis',
            content: [
              "Disposer d'une connexion internet stable pour accéder à la plateforme en ligne.",
              "Avoir un dispositif compatible tel qu'un ordinateur, une tablette ou un smartphone pour se connecter à Watiqa.ma.",
              "Être une personne physique majeure enregistrée dans les registres d'état civil du Maroc.",
              "S'assurer d'avoir les informations nécessaires pour remplir les demandes de documents administratifs de manière précise et complète.",
              "Disposer d'une adresse valide pour recevoir les documents par courrier recommandé.",                    ]
          },
          {
            id: 'Considerations',
            title: 'Considérations futures',
            content: [
              " <span style='color: #7061A3;'>Amélioration de l'expérience utilisateur :</span> Watiqa.ma pourrait apporter des améliorations continues à l'interface utilisateur et à l'expérience globale des utilisateurs. Cela peut inclure des mises à jour de conception, des fonctionnalités plus conviviales et une navigation plus intuitive pour faciliter l'utilisation de la plateforme.",
              "<span style='color: #7061A3;'> Évolution en fonction des besoins des administrations :</span> La plateforme Watiqa.ma continuera à se développer et à s'adapter en fonction des besoins des administrations et des avancées technologiques. De nouvelles fonctionnalités pourront être ajoutées pour améliorer l'efficacité des processus métiers et faciliter la collaboration entre les administrations.",
              "<span style='color: #7061A3;'>Amélioration de la sécurité des échanges : </span> Des mesures supplémentaires pourront être mises en place pour renforcer la sécurité des échanges entre les administrations adhérentes à la plateforme. Cela peut inclure l'utilisation de technologies de cryptage ou d'authentification renforcée."                ]
          }
        ]
      },
      {
            id: 3,
            title: "Chikaya.ma",
            background: "/assets/images/chikaya-bg.svg",
            sousTitle: "Découvrez Watiqa.ma, la plateforme incontournable pour simplifier vos démarches administratives en ligne.",
            videoLink: this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/tUP5S4YdEJo"),
            lancementDate: "2011",
            cible: "les citoyens marocains",
            version: "1.8",
            descriptionTitle: "Watiqa - Le guichet électronique de commande de l’état civil.",
            description: "Watiqa.ma est un service en ligne qui offre la possibilité de commander électroniquement des documents administratifs tels que des copies intégrales ou des extraits d'acte de naissance, et de les recevoir par courrier recommandé à l'adresse de votre choix. Cette plateforme est développée en collaboration avec l'Agence de Développement du Digital, le Ministère de l'Intérieur et Barid Al-Maghrib.<br><br> Grâce à Watiqa.ma, vous pouvez effectuer vos demandes administratives à distance, sans avoir à vous déplacer physiquement aux bureaux d'état civil. Cela vous permet d'optimiser votre temps et vos déplacements, tout en bénéficiant de services administratifs transparents et sécurisés.",
            elements: [
                {
                    id: 'fonctions',
                    title: 'Fonctions Principales',
                    content: [
                        "Commande électronique de documents administratifs tels que des copies intégrales ou des extraits d'acte de naissance.",
                        "Réception des documents par courrier recommandé à l'adresse de votre choix.",
                        "Interface conviviale pour naviguer facilement sur la plateforme et effectuer vos demandes.",
                        "Suivi en ligne de l'état d'avancement de vos dossiers."
                    ]
                },
                {
                    id: 'avantages',
                    title: 'Avantages majeurs',
                    content: [
                        "Simplification des démarches administratives en permettant de les effectuer en ligne, sans avoir à se déplacer physiquement aux bureaux d'état civil.",
                        "Gain de temps et d'efficacité en évitant les files d'attente et en bénéficiant d'un traitement rapide de vos demandes.",
                        "Service à distance pratique et accessible, permettant de commander des documents administratifs de manière transparente.",
                        "Sécurité renforcée des échanges, avec la réception des documents par courrier recommandé.",
                        "Transparence et fiabilité des services administratifs offerts par la plateforme.",
                        "Optimisation des déplacements en évitant des trajets inutiles pour des demandes administratives.",
                        "Facilité d'utilisation grâce à une interface conviviale et intuitive.",
                        "Réduction des coûts liés à la gestion des courriers et des processus administratifs.",
                    ]
                },
                {
                    id: 'prerequis',
                    title: 'Prérequis',
                    content: [
                        "Disposer d'une connexion internet stable pour accéder à la plateforme en ligne.",
                        "Avoir un dispositif compatible tel qu'un ordinateur, une tablette ou un smartphone pour se connecter à Watiqa.ma.",
                        "Être une personne physique majeure enregistrée dans les registres d'état civil du Maroc.",
                        "S'assurer d'avoir les informations nécessaires pour remplir les demandes de documents administratifs de manière précise et complète.",
                        "Disposer d'une adresse valide pour recevoir les documents par courrier recommandé.",                    ]
                },
              {
                    id: 'Considerations',
                    title: 'Considérations futures',
                    content: [
                         " <span style='color: #7061A3;'>Amélioration de l'expérience utilisateur :</span> Watiqa.ma pourrait apporter des améliorations continues à l'interface utilisateur et à l'expérience globale des utilisateurs. Cela peut inclure des mises à jour de conception, des fonctionnalités plus conviviales et une navigation plus intuitive pour faciliter l'utilisation de la plateforme.",
                          "<span style='color: #7061A3;'> Évolution en fonction des besoins des administrations :</span> La plateforme Watiqa.ma continuera à se développer et à s'adapter en fonction des besoins des administrations et des avancées technologiques. De nouvelles fonctionnalités pourront être ajoutées pour améliorer l'efficacité des processus métiers et faciliter la collaboration entre les administrations.",
                          "<span style='color: #7061A3;'>Amélioration de la sécurité des échanges : </span> Des mesures supplémentaires pourront être mises en place pour renforcer la sécurité des échanges entre les administrations adhérentes à la plateforme. Cela peut inclure l'utilisation de technologies de cryptage ou d'authentification renforcée."                ]
              }
            ]
        },{
        id: 4,
        title: "Watiqa",
        background: "/assets/images/Watiqa-bg.svg",
        sousTitle: "Découvrez Watiqa.ma, la plateforme incontournable pour simplifier vos démarches administratives en ligne.",
        videoLink: this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/tUP5S4YdEJo"),
        lancementDate: "2011",
        cible: "les citoyens marocains",
        version: "1.8",
        descriptionTitle: "Watiqa - Le guichet électronique de commande de l’état civil.",
        description: "Watiqa.ma est un service en ligne qui offre la possibilité de commander électroniquement des documents administratifs tels que des copies intégrales ou des extraits d'acte de naissance, et de les recevoir par courrier recommandé à l'adresse de votre choix. Cette plateforme est développée en collaboration avec l'Agence de Développement du Digital, le Ministère de l'Intérieur et Barid Al-Maghrib.<br><br> Grâce à Watiqa.ma, vous pouvez effectuer vos demandes administratives à distance, sans avoir à vous déplacer physiquement aux bureaux d'état civil. Cela vous permet d'optimiser votre temps et vos déplacements, tout en bénéficiant de services administratifs transparents et sécurisés.",
        elements: [
          {
            id: 'fonctions',
            title: 'Fonctions Principales',
            content: [
              "Commande électronique de documents administratifs tels que des copies intégrales ou des extraits d'acte de naissance.",
              "Réception des documents par courrier recommandé à l'adresse de votre choix.",
              "Interface conviviale pour naviguer facilement sur la plateforme et effectuer vos demandes.",
              "Suivi en ligne de l'état d'avancement de vos dossiers."
            ]
          },
          {
            id: 'avantages',
            title: 'Avantages majeurs',
            content: [
              "Simplification des démarches administratives en permettant de les effectuer en ligne, sans avoir à se déplacer physiquement aux bureaux d'état civil.",
              "Gain de temps et d'efficacité en évitant les files d'attente et en bénéficiant d'un traitement rapide de vos demandes.",
              "Service à distance pratique et accessible, permettant de commander des documents administratifs de manière transparente.",
              "Sécurité renforcée des échanges, avec la réception des documents par courrier recommandé.",
              "Transparence et fiabilité des services administratifs offerts par la plateforme.",
              "Optimisation des déplacements en évitant des trajets inutiles pour des demandes administratives.",
              "Facilité d'utilisation grâce à une interface conviviale et intuitive.",
              "Réduction des coûts liés à la gestion des courriers et des processus administratifs.",
            ]
          },
          {
            id: 'prerequis',
            title: 'Prérequis',
            content: [
              "Disposer d'une connexion internet stable pour accéder à la plateforme en ligne.",
              "Avoir un dispositif compatible tel qu'un ordinateur, une tablette ou un smartphone pour se connecter à Watiqa.ma.",
              "Être une personne physique majeure enregistrée dans les registres d'état civil du Maroc.",
              "S'assurer d'avoir les informations nécessaires pour remplir les demandes de documents administratifs de manière précise et complète.",
              "Disposer d'une adresse valide pour recevoir les documents par courrier recommandé.",                    ]
          },
          {
            id: 'Considerations',
            title: 'Considérations futures',
            content: [
              " <span style='color: #7061A3;'>Amélioration de l'expérience utilisateur :</span> Watiqa.ma pourrait apporter des améliorations continues à l'interface utilisateur et à l'expérience globale des utilisateurs. Cela peut inclure des mises à jour de conception, des fonctionnalités plus conviviales et une navigation plus intuitive pour faciliter l'utilisation de la plateforme.",
              "<span style='color: #7061A3;'> Évolution en fonction des besoins des administrations :</span> La plateforme Watiqa.ma continuera à se développer et à s'adapter en fonction des besoins des administrations et des avancées technologiques. De nouvelles fonctionnalités pourront être ajoutées pour améliorer l'efficacité des processus métiers et faciliter la collaboration entre les administrations.",
              "<span style='color: #7061A3;'>Amélioration de la sécurité des échanges : </span> Des mesures supplémentaires pourront être mises en place pour renforcer la sécurité des échanges entre les administrations adhérentes à la plateforme. Cela peut inclure l'utilisation de technologies de cryptage ou d'authentification renforcée."                ]
          }
        ]
      },
      ];


    setActive(index: number): void {
        this.isActive = index;
    }

    ngOnInit() {
        window.scrollTo(0, 0);
      this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        if (!this.isLoggedIn) {
          this.getSolution();

        } else {
          this.getSolutionForUser();

        }
        console.log('loggdIn :' + loggedIn);
      });
      this.userService.currentUser.subscribe(
        (user: Utilisateur) => {
          this.user = user;
          console.log("from nav bar", this.user?.username); // Ensure user is defined before accessing its properties
        }
      );
      this.user = this.userService.currentUserValue;



      this.isLoggedIn = this.authService.isLoggedIn();


    }
getSolutionForUser(){
  this.route.params.subscribe(params => {
    this.id = parseInt(params['id'], 10);
    const id = this.id + 1;
    this.solutionService.getSolutionForUser(id).subscribe(
      (solution: SolutionDto) => {
        this.solution = solution;
      },
      (error) => {
        console.error('Error fetching solution:', error);
      }
    );
  });
}
getSolution(){
  this.route.params.subscribe(params => {
    this.id = parseInt(params['id'], 10); // Retrieve the ID from the route parameters
    const id = this.id + 1;


    this.solutionService.getSolution(id).subscribe(
      (solution: SolutionDto) => {
        this.solution = solution;
      },
      (error) => {
        console.error('Error fetching solution:', error);
      }
    );
  });
}

  souscrire(id: number) {
    if(this.isLoggedIn && this.user) {
      const requestData: RequestDto = {
        solution_id: id
      };

      this.solutionService.souscrire(requestData).subscribe(
        response => {
          console.log('Request submitted successfully:', response);
          this.getSolutionForUser();
          this.projectService.getProjectsCountByClientId(this.user.id);

        },
        error => {
          console.error('Error submitting request:', error);
          // Handle error as needed
        }
      );
    }
    else {
      this.router.navigateByUrl('/login');

    }
  }
  getProject(solutionId: number, clientId: number): void {
    this.projectService.getProjectId(solutionId, clientId)
      .subscribe(projectId => {
        console.log('Project ID:', projectId);
        this.router.navigate(['/project', projectId]);
      });
  }

  confirm1($event: MouseEvent,solutionId:number) {
    if ($event.target) {
      this.confirmationService.confirm({
        target: $event.target as EventTarget,
        message: 'Êtes-vous sûr de vouloir continuer?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Vous êtes abonné avec succès' });
          this.souscrire(solutionId);
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Vous avez rejeté', life: 3000 });
        }
      });
    }
  }
}
