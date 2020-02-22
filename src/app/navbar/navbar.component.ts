import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Link } from '../link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarlist :Link[] = [
    { display : 'About', target: '#about', public: true},
    { display : 'Home', target: '#home', public: true},
    { display : 'Car', target: '#car', public: true},
    { display : 'Contact', target: '#contact', public: true},
    { display : 'For Sale', target: '#forsale', public: true},
    { display : 'Login', target: '#login', public: false}
  ]

  @Output() messageEvent = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(message: string) {
    this.messageEvent.emit(message.replace(/#/, ''));
  }

}
