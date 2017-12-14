import {Component, OnInit} from '@angular/core';
import {ChangementPelouse, Client, ReparationLumiere, Reservation, Terrain} from "../../entities/ReparationLumiere";
import {Http} from "@angular/http";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ReservationService} from "../../services/ReservationService";
import {TerrainService} from "../../services/TerrainService";
import {ReparationLumiereService} from "../../services/ReparationLumiereService";
import {ChangementPelouseService} from "../../services/ChangementPelouseService";
import {ClientService} from "../../services/ClientService";
import { Router } from '@angular/router';

const now = new Date();

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  mode: number = 0;
  errorReserv: number = 0;
  model: NgbDateStruct;
  time = {hour: 15, minute: 0};
  terrains: Terrain[] = [];
  reservations: Reservation[] = [];
  changementsPelouses: ChangementPelouse[]=[];
  reparationsLumieres: ReparationLumiere[]=[];
  heures: number[] = [];
  reserved: any[][] = [];
  numTelephone: string = "06";
  nomClient: string = "";
  terrainId: number = 1;

  constructor(public http: Http,
              private router: Router,
              public reservationService: ReservationService,
              public terrainService: TerrainService,
              public reparationLumiereService: ReparationLumiereService,
              public changementPelouseService: ChangementPelouseService,
              public clientService: ClientService) {
  }

  ngOnInit() {
    this.selectToday();
    this.terrainService.getTerrains().subscribe(data => {
        this.terrains = data._embedded.terrains;
        this.selectToday();
        this.reservationService.getReservationInOneDay(this.model.year, this.model.month, this.model.day)
          .subscribe(data => {
              this.reservations = data;
              this.loadHours();
              this.initReserved();
              this.fullfillReserved();
              this.changementPelouseService.getChangementPeouse(this.model).subscribe(data1=>{
                this.changementsPelouses=data1;
                this.fulfillChPl();
              },err2=>console.log(err2));
              this.reparationLumiereService.getReparationLumiere(this.model).subscribe(data2=>{
                this.reparationsLumieres=data2;
                this.fulfillRepLum();
              },err3=>console.log(err3))
            }
            , error => {
              console.log(error)
            });
      }
      , error => {
        this.router.navigate(['authentification']);
        console.error('An error occurred in dashboard component, navigating to login: ', error);
      });
  }

  loadHours() {
    for (let i = 15; i <= 23; i++)
      this.heures.push(i);
  }

  initReserved() {
    for (let heure of this.heures) {
      this.reserved[heure] = [];
      for (let terrain of this.terrains)
        this.reserved[heure][terrain.terrainId] = false;
    }
  }

  fullfillReserved() {
    for (let reservation of this.reservations) {
      this.reserved[reservation.date.hour][reservation.terrain.terrainId] = reservation;
    }
  }

  fulfillChPl(){
  for(let chpl of this.changementsPelouses)
    for(let heure of this.heures)
      this.reserved[heure][chpl.terrain.terrainId]=chpl;
  }
  fulfillRepLum(){
    for(let repLum of this.reparationsLumieres){
      for(let heure=repLum.heure.hour;heure<repLum.heure.hour+3;heure++){
        if(heure>=15&&heure<=24)
          this.reserved[heure][repLum.terrain.terrainId]=repLum;
      }
    }
  }
  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  getReservation() {
    this.reservationService.getReservationInOneDay(this.model.year, this.model.month, this.model.day)
      .subscribe(data => {
          this.reservations = data;
          this.initReserved();
          this.fullfillReserved();
          this.changementPelouseService.getChangementPeouse(this.model).subscribe(data1=>{
            this.changementsPelouses=data1;
            this.fulfillChPl();
          },err2=>console.log(err2));
          this.reparationLumiereService.getReparationLumiere(this.model).subscribe(data2=>{
            this.reparationsLumieres=data2;
            this.fulfillRepLum();
          },err3=>console.log(err3))
        }
        , error => {
          console.log(error)
        });
  }

  reserver() {
    if (this.mode == 0) {
      this.essayerDeReserver();
    }
    else {
      this.clientService.nouveauClient(new Client(this.numTelephone, this.nomClient, false))
        .subscribe(data => {
          this.essayerDeReserver();
          console.log(data);
        }, err => {
          console.log(err);
        })
    }
  }
  essayerDeReserver(){
    this.reservationService.reserver(this.numTelephone, this.terrainId, this.model, this.time)
      .subscribe(data => {
          console.log(data);
          this.mode=0;
          this.errorReserv = 0;
          this.reserved[this.time.hour][this.terrainId] = data;
        },
        error => {
          if (error._body == 'Client inexistant') {
            this.mode = 1;
          }
          if (error._body == 'impossible de reserver: client dans la liste noire') {
            this.errorReserv = 1;
          }
          if (error._body == 'Changement de pelouse pendant cette journée') {
            this.errorReserv = 2;
          }
          if (error._body == 'Reparation de lumiere pendant cette heure') {
            this.errorReserv = 3;
          }
          if (error._body == 'Ce terrain est déja réservé pendant cette date') {
            this.errorReserv = 4;
          }
          if (error._body == 'impossible de reserver avant aujourd\'hui') {
            this.errorReserv = 5;
          }
          console.log(error);
        });
  }
  classeSwitch(cas) {
    if (cas == false)
      return "bg-success";
    if (cas.reservationId != null)
      return "bg-danger";
    if (cas.changementPelouseId != null)
      return "bg-warning";
    if (cas.reparationLumiereId != null)
      return "bg-warning";
  }
  selectionerCase(heure:number, terrainId:number){
    this.terrainId= terrainId;
    this.time= {hour: heure, minute: 0};
  }
}
