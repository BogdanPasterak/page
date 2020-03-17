import { Component, OnInit } from '@angular/core';
import { Part } from '../part';
import { PartsService } from '../parts.service';


@Component({
  selector: 'app-forsale',
  templateUrl: './forsale.component.html',
  styleUrls: ['./forsale.component.css']
})
export class ForsaleComponent implements OnInit {

  parts: Part[];

  constructor(private partsService: PartsService) { }

  ngOnInit(): void {
    this.getParts();
  }

  getParts(): void {
    this.partsService.getParts()
      .subscribe(parts => this.parts = parts);
  }

}
