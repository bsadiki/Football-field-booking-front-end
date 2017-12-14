import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AuthenticationService} from "./AuthenticationService";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class AbonnementService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });
  constructor(public http: Http,
              private authenticationService: AuthenticationService) {
  }

  abonnementsActuels(page: number, size: number) {
    return this.http.get('http://localhost:8080/abonnementsCourants/?page=' + page + '&size=' + size,{headers: this.headers})
      .map(resp => resp.json())
  }

  saveAbonnement(idClient: string, model: NgbDateStruct, duree: number, day: string, time: { hour: number, minute: number }, terrainType: number) {
    let monthString: string;
    let dayString: string;
    let heureString: string;
    let minuteString: string;
    if (model.month < 10)
      monthString = '0' + model.month;
    else
      monthString = model.month.toString();
    if (model.day < 10)
      dayString = '0' + model.day;
    else
      dayString = model.day.toString();
    if (time.hour < 10)
      heureString = '0' + time.hour;
    else
      heureString = time.hour.toString();
    if (time.minute < 10)
      minuteString = '0' + time.minute;
    else
      minuteString = time.minute.toString();

    return this.http.post("http://localhost:8080/ajouterAbonnement/" + idClient + "/" + model.year +
      "-" + monthString + "-" + dayString + "/" + duree + "/" + day + "/" + heureString + "%3A" + minuteString + "/" + terrainType + "/", null,{headers: this.headers})
      .map(resp => resp.json())
  }
}
