import { Component, OnInit } from '@angular/core';
import { Part } from '../part';
import { PartsService } from '../parts.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-forsale',
  templateUrl: './forsale.component.html',
  styleUrls: ['./forsale.component.css']
})
export class ForsaleComponent implements OnInit {

  parts: any;
  selectedPart: Part;

  constructor(private partsService: PartsService) { }

  ngOnInit(): void {
    this.getPartsList();
    // this.parts = [{ key: "12", name: 'Mug', quantity: 10, price: 1.99, description:'My mug with coffe inside, very hot', image: 'assets/img/img-parts/mug.jpg'}];
  }

  getPartsList(): void {
    this.partsService.getPartsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(parts => {this.parts = parts});
  }


  onSelectPart(part: Part): void {
    this.selectedPart = part;
    // console.log(part);
  }

  getSelectedPart(): Part {
    return this.selectedPart;
  }

}
