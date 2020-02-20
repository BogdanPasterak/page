import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Link } from '../link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarlist :Link[] = [
    { display : 'About', target: 'about', secret: false},
    { display : 'Home', target: 'home', secret: false},
    { display : 'Car', target: 'car', secret: false},
    { display : 'Contact', target: 'contact', secret: false},
    { display : 'For Sale', target: 'forsale', secret: false},
    { display : 'Login', target: 'login', secret: false}
  ]

  @Output() messageEvent = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(message) {
    this.messageEvent.emit(message)
  }

}
