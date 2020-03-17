import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homeandcar',
  templateUrl: './homeandcar.component.html',
  styleUrls: ['./homeandcar.component.css']
})
export class HomeandcarComponent implements OnInit {

  section: string = 'myPage';
  mainpage: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }


  receiveMsg($event) {
    this.section = $event;
    if ($event == "forsale")
      this.mainpage = false;
    else
      this.mainpage = true;
  }

}
