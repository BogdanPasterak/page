import { Component, OnInit } from '@angular/core';
import { Serv } from '../serv'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  servlist:Serv[] = [
    { title: 'aaa', description: 'bbb'},
    { title: 'ccc', description: 'bbb'},
    { title: 'ddd', description: 'bbb'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
