import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { Part } from '../part';
import { PartsService } from '../parts.service'
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-part',
  templateUrl: './create-part.component.html',
  styleUrls: ['./create-part.component.css']
})
export class CreatePartComponent implements OnInit {

  imgSrc: string;
  selectedImg: any = null;
  submitted: boolean;
  part: Part = this.createNewPart();

  formTemplate = new FormGroup({
    name: new FormControl('', Validators.minLength(3)),
    quantity: new FormControl(1, [Validators.max(100), Validators.min(1)]),
    price: new FormControl(null, [Validators.max(10000), Validators.min(0.10),Validators.required]),
    description: new FormControl(''),
    image: new FormControl('', Validators.required)
  })


  constructor(private partsService: PartsService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.resetForm();
  }

  @Output() msgEvent = new EventEmitter<string>();

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    this.show(event.dataTransfer.types, event.dataTransfer.files[0] as File)
    console.log("onDrop", event.dataTransfer.files[0]);
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

  newPart(): void {
    this.part = this.createNewPart();
  }

  log(x) {
    console.log("log", x);
  }

  onSubmit(formValue) {

    if (this.formTemplate.valid){
      let filePath =`imagesForSale/${this.selectedImg.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['image'] = url;
            this.partsService.createPart(formValue as Part);
            this.resetForm();
          })
        })
      ).subscribe();
    } else {
      // alert("Invalid form");
      this.submitted = true;
    }
  }


  resetForm() {
    this.submitted = false;
    this.imgSrc = 'assets/img/camera.svg';
    this.selectedImg = null; 
    this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '',
      quantity: 1,
      price: null,
      description: '',
      image: ''
    });
  }

  createNewPart() : Part {
    let newPart: Part = new Part(); 
    newPart.quantity = 1;
    return newPart;
  }

  cancel() {
    this.msgEvent.emit("cancel");
  }

  get fC() {
    return this.formTemplate['controls'];
  }

}
