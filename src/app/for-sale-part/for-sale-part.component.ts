import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Part } from '../part';
import { PartsService } from '../parts.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-for-sale-part',
  templateUrl: './for-sale-part.component.html',
  styleUrls: ['./for-sale-part.component.css']
})
export class ForSalePartComponent implements OnInit {

  @Input() part: Part;
  @Output() msgEvent = new EventEmitter<Part>();

  constructor(private partsService: PartsService, public afAuth: AngularFireAuth, public dialog: MatDialog) { }

  ngOnInit(): void {
    // console.log(this.part);
  }
  
  deleteItem() {

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90%',
      data: {name: this.part.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ){
        this.partsService.deletePart(this.part.key);
      }
    });

  }

  editItem() {
    this.msgEvent.emit(this.part)
  }


}
