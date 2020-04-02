import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Link } from '../link';
import { LINKS } from "../mock-links";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarlist :Link[] = LINKS;

  @Output() messageEvent = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(message: string) {
    this.messageEvent.emit(message.replace(/#/, ''));
  }

}
