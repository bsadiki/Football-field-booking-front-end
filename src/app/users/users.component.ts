import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/UserService";
import {User} from "../../entities/ReparationLumiere";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userName:string="";
  password:string="";
  authority:string="USER";
  pageClients: any;
  currentpage: number = 0;
  size: number = 5;
  pages: Array<number>;
  toto:number[]=[];
  user :any;
  constructor(private userService:UserService) {
    this.user=JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.user);
    userService.getUserByName(this.user.username).subscribe(data=>{
      this.user=data;
      console.log(data);
    },error=>{
      console.log(error);
    })
  }

  ngOnInit() {
    this.doSearch();
  }
  doSearch(){
    this.userService.getUsers(this.currentpage, this.size)
      .subscribe(data => {
        console.log(data);
        this.pageClients = data;
        this.pages = new Array(data.totalPages);
      }, error => {
        console.log(error);
      })
  }
  gotoPage(i: number) {
    this.currentpage = i;
    this.doSearch();
    this.toto.length
  }
  addNewUser(){
    let user:User=new User(this.userName,this.password,this.authority,true);
    this.userService.newUser(user).subscribe(data=>{
      console.log(data);
      this.pageClients.content.push(data);
      this.pages=new Array(data.totalPages);
    },error=>{
      console.log(error);
    });
  }
}
