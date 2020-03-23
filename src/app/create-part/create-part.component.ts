import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel, FormGroup, FormControl } from '@angular/forms';
import { Part } from '../part';
import { PartsService } from '../parts.service'

@Component({
  selector: 'app-create-part',
  templateUrl: './create-part.component.html',
  styleUrls: ['./create-part.component.css']
})
export class CreatePartComponent implements OnInit {

  formTemplate = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl(1),
    price: new FormControl(0.99),
    description: new FormControl(''),
    image: new FormControl('')
  })

  part: Part = this.createNewPart();
  submitted = false;

  constructor(private partsService: PartsService) { }

  ngOnInit(): void {
  }

  newPart(): void {
    this.submitted = false;
    this.part = this.createNewPart();
  }

  log(x) {
    console.log("log", x);
  }

  onSubmit() {
    if (true){
      this.submitted = true;
      this.partsService.createPart(this.part);
      this.part = this.createNewPart();
    }
  }

  createNewPart() : Part {
    let newPart: Part = new Part(); 
    newPart.quantity = 1;
    return newPart;
  }

}
