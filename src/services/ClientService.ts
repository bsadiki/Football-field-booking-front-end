import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Client} from "../entities/ReparationLumiere";
import {AuthenticationService} from "./AuthenticationService";

@Injectable()
export class ClientService{
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });
  constructor(private http:Http,
              private authenticationService: AuthenticationService){

  }
  host="http://localhost:8080/clients";
  nouveauClient(client: Client){
    return this.http.post(this.host,client,{headers: this.headers}).map(resp=>resp.json());
  }
}
