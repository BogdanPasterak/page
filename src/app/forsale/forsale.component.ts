import { Component, OnInit } from '@angular/core';
import { Part } from '../part';
import { PartsService } from '../parts.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PartService } from '../part.service';


@Component({
  selector: 'app-forsale',
  templateUrl: './forsale.component.html',
  styleUrls: ['./forsale.component.css']
})
export class ForsaleComponent implements OnInit {

  parts: any;
  selectedPart: Part;
  editedPart: Part;

  constructor(private partsService: PartsService, private partService: PartService, private _router: Router) { }

  ngOnInit(): void {
    this.getPartsList();
    this.editedPart = null;
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
    this.partService.changePart(part);
    this._router.navigate(['/view']);
  }

  getSelectedPart(): Part {
    return this.selectedPart;
  }

  receiveMsg($event) {
    if (typeof $event == "string") {
        if ($event == "cancel" || $event == "submitted") {
        this.editedPart = null;
      }
    } else if (typeof $event == "object") {
      this.editedPart = $event as Part;
    }
    //  console.log(typeof $event)
  }

}
