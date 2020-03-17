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
  selectedPart: Part;

  constructor(private partsService: PartsService) { }

  ngOnInit(): void {
    this.getParts();
  }

  onSelectPart(part: Part): void {
    this.selectedPart = part;
    console.log(part);
  }

  getSelectedPart(): Part {
    return this.selectedPart;
  }

  getParts(): void {
    this.partsService.getParts()
      .subscribe(parts => this.parts = parts);
  }

}
