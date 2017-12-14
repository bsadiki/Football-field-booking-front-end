import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AuthenticationService} from "./AuthenticationService";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class ChangementPelouseService{
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });
  constructor(private http:Http,
              private authenticationService: AuthenticationService){}
  host:string="http://localhost:8080/";
  nouveauChangementPelouse(terrainId:number,journee:NgbDateStruct){
    let monthString: string;
    let dayString: string;
    if (journee.month < 10)
      monthString = '0' + journee.month;
    else
      monthString = journee.month.toString();
    if (journee.day < 10)
      dayString = '0' + journee.day;
    else
      dayString = journee.day.toString();
    return this.http.post(this.host+'ajouterChangementPelouse/'+terrainId+'/'+journee.year + "-" + monthString + "-" + dayString +'/',null,{headers: this.headers})
      .map(resp => resp.json())
  }
  getChangementPeouse(model:{year:number , month:number, day:number}){
    let monthString : string;
    let dayString: string;
    if(model.month<10)
      monthString='0'+model.month;
    else
      monthString=model.month.toString();
    if(model.day<10)
      dayString='0'+model.day;
    else
      dayString=model.day.toString();
    return this.http.get(this.host+"chPlParDate/"+model.year+"-"+monthString+"-"+dayString,{headers: this.headers})
      .map(resp=>resp.json())
  }
}
