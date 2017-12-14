import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Client, User} from "../entities/ReparationLumiere";
import {AuthenticationService} from "./AuthenticationService";

@Injectable()
export class UserService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {

  }

  host = "http://localhost:8080";

  newUser(user: User) {
    return this.http.post(this.host + "/addNewUser/" + user.userName + "/" + user.password + "/" + user.authority, null, {headers: this.headers}).map(resp => resp.json());
  }

  getUsers(page : number , size : number) {
    return this.http.get(this.host+'/getUsers?page=' + page + '&size=' + size,{headers: this.headers})
      .map(resp => resp.json())
  }
  getUserByName(userName:string) {
    return this.http.get(this.host+'/byUserName?username=' + userName,{headers: this.headers})
      .map(resp => resp.json())
  }
}
