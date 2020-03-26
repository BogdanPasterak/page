import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../user";
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-homeandcar',
  templateUrl: './homeandcar.component.html',
  styleUrls: ['./homeandcar.component.css']
})
export class HomeandcarComponent implements OnInit {

  us: string;
  section: string = 'myPage';
  mainpage: boolean = true;
  login: boolean = false;
  data: any;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    // this.doS();
  }

  async doS() {
    this.isLog().pipe(
      tap(u => {
        this.us = (u) ? u.email : "nikt";
        console.log(this.us);
      })
    ).subscribe()
  }

  isLog() {
    return this.afAuth.authState.pipe(first());
  }

  receiveMsg(event:string) {
    //console.log(event);
    this.section = event;
    this.login = false;
    if (event == "forsale" || event == "login") {
      this.mainpage = false;
      this.data = (event == "login") ? "login" : null;
    }
    else
      this.mainpage = true;
    }

}
