import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarlist = ['About','Home','Car','Contact','For Sale','Login'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
