import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AuthenticationService} from "./AuthenticationService";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class ReparationLumiereService{
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  host:string="http://localhost:8080/";
  constructor(private http:Http,
              private authenticationService: AuthenticationService){}
  getReparationLumiere(model:{year:number , month:number, day:number}){
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
    return this.http.get(this.host+"reLuParJour/"+model.year+"-"+monthString+"-"+dayString,{headers: this.headers})
      .map(resp=>resp.json())
  }
  saveReparationLumiere(model: NgbDateStruct, time : {hour: number, minute: number}, terrainId: number){
    let monthString : string;
    let dayString: string;
    let heureString: string;
    let minuteString: string;
    if(model.month<10)
      monthString='0'+model.month;
    else
      monthString=model.month.toString();
    if(model.day<10)
      dayString='0'+model.day;
    else
      dayString=model.day.toString();
    if (time.hour < 10)
      heureString = '0' + time.hour;
    else
      heureString = time.hour.toString();
    if (time.minute < 10)
      minuteString = '0' + time.minute;
    else
      minuteString = time.minute.toString();
    return this.http.post('http://localhost:8080/ajouterReparationLumiere/'+terrainId+'/'+ model.year + "-" + monthString + "-" + dayString + 'T' + heureString + '%3A' + minuteString +'/',null,{headers: this.headers})
      .map(resp => resp.json())
  }
}
