import { Component, OnInit } from '@angular/core';
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

  imgSrc: string = '/assets/img/camera.svg';
  selectedImg: any = null;
  isSubmited: boolean = false;

  formTemplate = new FormGroup({
    name: new FormControl('', Validators.minLength(3)),
    quantity: new FormControl(1, [Validators.max(100), Validators.min(1)]),
    price: new FormControl(0.00, [Validators.max(10000), Validators.min(0.10)]),
    description: new FormControl(''),
    image: new FormControl('')
  })

  part: Part = this.createNewPart();
  submitted = false;

  constructor(private partsService: PartsService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.resetForm();
  }
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
    console.log("showPreview", event.target.files[0]);
  }

  show(files:any, firstFile: File) {
    if (files && firstFile){
      const reader = new FileReader();
      reader.onload = (e:any) => {this.imgSrc = e.target.result};
      reader.readAsDataURL(firstFile);
      this.selectedImg = firstFile;
      console.log("Value", this.formTemplate.controls.image.value);
    } else {
      this.imgSrc = '/assets/img/camera.svg';
      this.selectedImg = null;
    }

  }

  newPart(): void {
    this.submitted = false;
    this.part = this.createNewPart();
  }

  log(x) {
    console.log("log", x);
  }

  onSubmit(formValue) {
    this.isSubmited = true;

    if (this.formTemplate.valid){
      let filePath =`imagesForSale/${this.selectedImg.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['image']=url;
            this.resetForm();
          })
        })
      ).subscribe();
      // this.submitted = true;
      // this.partsService.createPart(this.part);
      // this.part = this.createNewPart();
    }
  }

  resetForm() {

  }

  createNewPart() : Part {
    let newPart: Part = new Part(); 
    newPart.quantity = 1;
    return newPart;
  }

  get fC() {
    return this.formTemplate['controls'];
  }

}
