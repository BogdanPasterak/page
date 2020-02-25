import { Component, OnInit, Input } from '@angular/core';
import { Serv } from '../serv';

@Component({
  selector: 'app-lielement',
  templateUrl: './lielement.component.html',
  styleUrls: ['./lielement.component.css']
})
export class LielementComponent implements OnInit {

  @Input() serv: Serv;

  constructor() { }

  ngOnInit(): void {
  }

}
