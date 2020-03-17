import { Component, OnInit, Input } from '@angular/core';
import { Part } from '../part';

@Component({
  selector: 'app-for-sale-part',
  templateUrl: './for-sale-part.component.html',
  styleUrls: ['./for-sale-part.component.css']
})
export class ForSalePartComponent implements OnInit {

  @Input() part: Part;

  constructor() { }

  ngOnInit(): void {
  }

}
