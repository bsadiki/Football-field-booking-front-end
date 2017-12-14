import {Component, OnInit} from '@angular/core';
import {AbonnementService} from "../../services/AbonnementService";
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Client} from "../../entities/ReparationLumiere";
import {ClientService} from "../../services/ClientService";
const now = new Date();

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementComponent implements OnInit {
  mode: number = 0;
  errorAbonnement: number = 0;
  pageAbonnements: any;
  currentpage: number = 0;
  size: number = 5;
  pages: Array<number>;
  numTelephone: string= "06";
  nomClient: string = "";
  duree:number=3;
  model:NgbDateStruct;
  type:number=5;
  jour:string='MONDAY';
  time = {hour: 15, minute: 0};
  constructor(public abonnementService: AbonnementService,
              private clientService:ClientService) {}

  ngOnInit() {
    this.selectToday();
    this.doSearch();
  }
  saveAbonnement(){
    if(this.mode==0)
      this.essayerDeCreerAbonnement();
    if(this.mode==1){
      this.clientService.nouveauClient(new Client(this.numTelephone, this.nomClient, false))
        .subscribe(data => {
          this.essayerDeCreerAbonnement();
          console.log(data);
        }, err => {
          console.log(err);
        })
    }
  }
  essayerDeCreerAbonnement(){
    this.abonnementService.saveAbonnement(this.numTelephone,this.model,this.duree,this.jour,this.time,this.type)
      .subscribe(data=>{
        console.log(data);
        this.pageAbonnements.content.push(data);
        this.pages=new Array(data.totalPages);
        this.mode=0;
        this.errorAbonnement = 0;
      }, error=>{
        if (error._body == 'Client introuvable') {
          this.mode = 1;
        }
        if (error._body == 'Impossible de commencer l\'abonnement avant la date d\'aujourd\'hui') {
          this.errorAbonnement = 1;
        }
        if (error._body == 'impossible de reserver: client dans la liste noire') {
          this.errorAbonnement = 2;
        }
        console.log(error);
      });
  }
  doSearch(){
    this.abonnementService.abonnementsActuels(this.currentpage, this.size)
      .subscribe(data => {
        console.log(data);
        this.pageAbonnements = data;
        this.pages = new Array(data.totalPages);
      }, error => {
        console.log(error);
      })
  }
  gotoPage(i: number) {
    this.currentpage = i;
    this.doSearch();
  }
  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
}
