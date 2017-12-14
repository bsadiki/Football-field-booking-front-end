import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {ReparationLumiere} from "../../entities/ReparationLumiere";
import {ReparationLumiereService} from "../../services/ReparationLumiereService";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

const now = new Date();

@Component({
  selector: 'app-reparation-terrain',
  templateUrl: './reparation-terrain.component.html',
  styleUrls: ['./reparation-terrain.component.css']
})
export class ReparationTerrainComponent implements OnInit {
  terrains: number[] = [];
  terrainId: number = 1;
  model: NgbDateStruct;
  time = {hour: 9, minute: 0};
  success: boolean;
  reparationLumiere = new ReparationLumiere(null, null, null);
  message: any = "";
  date: string = "";

  constructor(public reparationLumiereService: ReparationLumiereService) {

  }

  ngOnInit() {
    this.selectToday();
    for (let i = 0; i < 10; i++)
      this.terrains[i] = i + 1;
  }

  saveReparationLumiere() {
    this.reparationLumiereService.saveReparationLumiere(this.model, this.time, this.terrainId).subscribe(data => {
        this.reparationLumiere = data;
        this.success = true;
        this.date = this.reparationLumiere.heure.dayOfMonth + "-" + this.reparationLumiere.heure.monthValue + "-" + this.reparationLumiere.heure.year+" à "
          +this.reparationLumiere.heure.hour+"h";

        console.log(this.reparationLumiere);
      }
      , error => {
        this.success = false;
        this.message = error._body;
        console.log(error);
      });
  }

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  classeSwitch() {
    if (this.success)
      return "bg-success";
    if (!this.success)
      return "bg-danger";
  }
}
