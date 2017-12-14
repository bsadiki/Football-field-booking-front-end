import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AuthenticationService} from "./AuthenticationService";

@Injectable()
export class TerrainService{
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(public http:Http,
              private authenticationService: AuthenticationService){
  }
  getTerrains(){
    return this.http.get('http://localhost:8080/terrains',{headers: this.headers})
      .map(resp => resp.json())
  }
}
