import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Part } from '../part';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.css']
})
export class EditPartComponent implements OnInit {

  imgSrc: string;
  selectedImg: any = null;
  submitted: boolean;


  formTemplate = new FormGroup({
    name: new FormControl('', Validators.minLength(3)),
    quantity: new FormControl(1, [Validators.max(100), Validators.min(1)]),
    price: new FormControl(null, [Validators.max(10000), Validators.min(0.10),Validators.required]),
    description: new FormControl(''),
    image: new FormControl('', Validators.required)
  })

  @Input() part: Part;
  @Output() msgEvent = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }


  showPreview(event: any) {
    this.show(event.target.files, event.target.files[0] as File)
    // console.log("showPreview", event.target.files[0]);
  }

  show(files:any, firstFile: File) {
    if (files && firstFile){
      const reader = new FileReader();
      reader.onload = (e:any) => {this.imgSrc = e.target.result};
      reader.readAsDataURL(firstFile);
      this.selectedImg = firstFile;
      // console.log("Value", this.formTemplate.controls.image.value);
    } else {
      this.imgSrc = 'assets/img/camera.svg';
      this.selectedImg = null;
    }

  }

  cancel() {
    this.msgEvent.emit("cancel");
  }



  onSubmit(formValue) {


  }



  get fC() {
    return this.formTemplate['controls'];
  }

}
