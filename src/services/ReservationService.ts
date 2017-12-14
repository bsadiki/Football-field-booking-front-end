import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AuthenticationService} from "./AuthenticationService";

@Injectable()
export class ReservationService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(public http: Http,
              private authenticationService: AuthenticationService) {
  }

  getReservationInOneDay(year: number, month: number, day: number) {
    let monthString: string;
    let dayString: string;
    if (month < 10)
      monthString = '0' + month;
    else
      monthString = month.toString();
    if (day < 10)
      dayString = '0' + day;
    else
      dayString = day.toString();
    return this.http.get('http://localhost:8080/reservationDansUnJour/' + year + "-" + monthString + "-" + dayString + '/', {headers: this.headers})
      .map(resp => resp.json())
  }

  reserver(numTel: string, terrainId: number, model: { year: number, month: number, day: number }, time: { hour: number, minute: number }) {
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
    return this.http.post('http://localhost:8080/reserver/' + numTel + '/' + terrainId + '/' + model.year + "-" + monthString + "-" + dayString + 'T' + heureString + '%3A' + minuteString + '/', null,{headers: this.headers})
      .map(resp => resp.json())
  }
}
