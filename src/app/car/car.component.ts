import { Component, OnInit } from '@angular/core';
import { Serv } from '../serv'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  servlist:Serv[] = [
    { symbol: "fas fa-tools", title: 'Pre-NCT and re-Test service', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-car-crash", title: 'Common rail injector test', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-shower", title: 'Car washing and valleting', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-smog", title: 'Exhaust Welding & Service', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-lightbulb", title: 'Light alignment for NCT', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-truck-monster", title: 'Wheel alignment', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'},
    { symbol: "fas fa-car", title: 'Car servicing', description: 'Bacon ipsum dolor amet andouille cupim swine pig ribeye, drumstick kielbasa pork doner sausage bacon landjaeger venison.'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
