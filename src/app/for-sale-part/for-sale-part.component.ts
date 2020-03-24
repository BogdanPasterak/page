import { Component, OnInit, Input } from '@angular/core';
import { Part } from '../part';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-for-sale-part',
  templateUrl: './for-sale-part.component.html',
  styleUrls: ['./for-sale-part.component.css']
})
export class ForSalePartComponent implements OnInit {

  @Input() part: Part;

  constructor(private partsService: PartsService) { }

  ngOnInit(): void {
    // console.log(this.part);
  }
  

}
