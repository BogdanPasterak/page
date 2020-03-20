import { Component, OnInit } from '@angular/core';
import { Part } from '../part';
import { PartsService } from '../parts.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-forsale',
  templateUrl: './forsale.component.html',
  styleUrls: ['./forsale.component.css']
})
export class ForsaleComponent implements OnInit {

  parts: Observable<Part[]>;
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
    this.parts = this.partsService.getParts();
    
  }

}
