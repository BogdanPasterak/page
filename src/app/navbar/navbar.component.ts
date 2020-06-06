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

  navbarlist: Link[] = LINKS;
  collapse: HTMLDivElement = null;

  @Output() messageEvent = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(message: string) {
    if (! this.collapse) {
      this.collapse = document.querySelector("#myNavbar");
    }
    this.collapse.classList.remove("in");
    this.messageEvent.emit(message.replace(/#/, ''));
  }

}
