import { Component, OnInit } from '@angular/core';
import {ChangementPelouse} from "../../entities/ReparationLumiere";
import {Http} from "@angular/http";
import {ChangementPelouseService} from "../../services/ChangementPelouseService";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

const now = new Date();

@Component({
  selector: 'app-changement-pelouse',
  templateUrl: './changement-pelouse.component.html',
  styleUrls: ['./changement-pelouse.component.css']
})
export class ChangementPelouseComponent implements OnInit {
  terrainId:number=1;
  terrains :number[]=[];
  model: NgbDateStruct;
  changementPelouse =new ChangementPelouse(null,null,null);
  success:boolean;
  message:any="";
  date:string;
  constructor(public changementPelouseService:ChangementPelouseService){}
  ngOnInit() {
    this.selectToday();
    for(let i=0;i<10;i++)
      this.terrains[i]=i+1;
  }
  saveReparationLumiere(){
    this.message="";
    this.changementPelouseService.nouveauChangementPelouse(this.terrainId,this.model).subscribe(data => {
        this.changementPelouse=data;
        this.success=true;
        this.date=this.changementPelouse.journee.dayOfMonth+"-"+this.changementPelouse.journee.monthValue+"-"+this.changementPelouse.journee.year;
        console.log(this.changementPelouse)}
      ,error => {
      console.log(error);
      this.success=false;
        this.message=error._body;
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
