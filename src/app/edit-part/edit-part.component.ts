import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Part } from '../part';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartsService } from '../parts.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ImageResizeService } from '../image-resize.service';
import { DataFile } from '../dataFile';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.css']
})
export class EditPartComponent implements OnInit {

  imgSrc: string | ArrayBuffer ='';
  selectedImg: any = null;
  submitted: boolean = false;


  formTemplate = new FormGroup({
    name: new FormControl('', Validators.minLength(3)),
    quantity: new FormControl(1, [Validators.max(100), Validators.min(1)]),
    price: new FormControl(null, [Validators.max(10000), Validators.min(0.10),Validators.required]),
    description: new FormControl(''),
    image: new FormControl('')
  })

  @Input() part: Part;
  @Output() msgEvent = new EventEmitter<string>();


  constructor(
    private partsService: PartsService,
    private storage: AngularFireStorage,
    private resize: ImageResizeService
    ) { }

  ngOnInit(): void {
    (document.querySelector("#toForSale") as HTMLElement).click();
    // console.log("part",this.part);
    this.resetForm();
  }

  resetForm() {
    this.submitted = false;
    this.imgSrc = this.part.image;
    this.selectedImg = null; 
    this.formTemplate.reset();
    this.formTemplate.setValue({
      name: this.part.name,
      quantity: this.part.quantity,
      price: this.part.price,
      description: this.part.description,
      image: ''
    });
  }


  showPreview(event: any) {
    this.show(event.target.files, event.target.files[0] as File)
    // console.log("showPreview", event.target.files[0]);
  }

  show(files:any, firstFile: File) {
    if (files && firstFile){
      this.resize.getImgAsync(firstFile)
      .then((res: DataFile) => {
        this.imgSrc = res.data;
        this.selectedImg = res.file;
      })
      .catch((error) => {
        console.log(error);
        this.selectedImg = null;
        this.imgSrc = 'assets/img/camera.svg';
      });

    } else {
      this.selectedImg = null;
      this.imgSrc = 'assets/img/camera.svg';
    }

  }

  cancel() {
    this.msgEvent.emit("cancel");
  }



  onSubmit(formValue) {

    if (this.formTemplate.valid){
      // console.log("image", (this.formTemplate.controls.image.value as string == ''))
      if (this.formTemplate.controls.image.value as string == '') {
        this.partsService.updatePart(this.part.key, {
          name: formValue.name,
          quantity: formValue.quantity,
          price: formValue.price,
          description: formValue.description
        });
        this.msgEvent.emit("submitted");
      } else {
        let filePath =`imagesForSale/${this.selectedImg.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);

        this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              // delete old image from storage
              this.storage.storage.refFromURL(this.part.image).delete();
              formValue['image'] = url;
              this.partsService.updatePart(this.part.key, formValue as Part);
              this.resetForm();
              this.msgEvent.emit("submitted");
            })
          })
        ).subscribe();

      }
    } else {
      // alert("Invalid form");
      this.submitted = true;
    }

  }



  get fC() {
    return this.formTemplate['controls'];
  }

}
