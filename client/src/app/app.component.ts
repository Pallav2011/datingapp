import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating app';
  users : any; 

  constructor(private htpp: HttpClient, private accountService: AccountService){}
  ngOnInit(): void {
  this.getUser();
  this.setCurrentUser();
  }

  getUser(){
    this.htpp.get('https://localhost:5001/api/users').subscribe({
      next: responce => this.users = responce,
      error: error => console.log(error),
      complete : () => console.log('Request has completed')      
    })
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

}
