import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homeandcar',
  templateUrl: './homeandcar.component.html',
  styleUrls: ['./homeandcar.component.css']
})
export class HomeandcarComponent implements OnInit {

  section: string = 'myPage';
  mainpage: boolean = true;
  login: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  receiveMsg(event:string) {
    console.log(event);
    if (event == "login") {
      this.login = true;
    }
    else {
      this.section = event;
      this.login = false;
      if (event == "forsale") {
        this.mainpage = false;
      }
      else
        this.mainpage = true;
      }
    }

}
