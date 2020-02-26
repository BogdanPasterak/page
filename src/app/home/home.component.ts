import { Component, OnInit } from '@angular/core';
import { Serv } from '../serv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  servlist: Serv[] = [
    { symbol: "fas fa-broom", title: 'Home and garden maintenance', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-tree", title: 'Hedge and tree trimming', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-shower", title: 'Pressure washing', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-brush", title: 'House painting', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-cut", title: 'Land mowing', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
