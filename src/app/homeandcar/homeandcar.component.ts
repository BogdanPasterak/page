import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homeandcar',
  templateUrl: './homeandcar.component.html',
  styleUrls: ['./homeandcar.component.css']
})
export class HomeandcarComponent implements OnInit {

  title = 'Home & Car Service';

  constructor() { }

  ngOnInit(): void {
  }


  receiveMsg($event) {
    this.title = $event;
  }

}
