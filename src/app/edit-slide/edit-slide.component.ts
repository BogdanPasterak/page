import { Component, OnInit, Input } from '@angular/core';
import { Slide } from '../slide';
import { SlidesService } from '../slides.service';
import { map, finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { async } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageResizeService } from '../image-resize.service';
import { DataFile } from '../dataFile';

@Component({
  selector: 'app-edit-slide',
  templateUrl: './edit-slide.component.html',
  styleUrls: ['./edit-slide.component.css']
})
export class EditSlideComponent implements OnInit {

  formTemplate = new FormGroup({
    number: new FormControl(0, [Validators.max(19), Validators.min(0)]),
    description: new FormControl('', Validators.minLength(3)),
    image: new FormControl('', Validators.required)
  })

  submitted: boolean;
  imgSrc: string | ArrayBuffer;
  selectedImg: any;

  @Input() slide: Slide;

  constructor(
    private slidesService: SlidesService,
    private storage: AngularFireStorage,
    private resize: ImageResizeService
) { }

  ngOnInit(): void {
    this.resetForm()
  }

  print() {
    this.slidesService.getSlideKeyByPosition(this.slide.position)
    .then(v => {
        console.log("key", v);
    })
    
    this.slidesService.getNumberSlides()
    .then(n =>{
      console.log("number", n);
    })

    console.log("Start");
  }
  
  cancel() {
    this.resetForm();
  }

  onSubmit(formValue) {

    // if (this.formTemplate.valid){

    //   let filePath =`imagesSlaids/${this.selectedImg.name}_${new Date().getTime()}`;
    //   const fileRef = this.storage.ref(filePath);

    //   this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
    //     finalize(() => {
          
    //       fileRef.getDownloadURL().subscribe((url) => {
    //         formValue['image'] = url;
    //         this.slidesService.createSlide({
    //           key: null,
    //           image: url,
    //           description: formValue['description'],
    //           position: formValue['number']
    //         } as Slide);
    //         this.resetForm();
    //       })
    //     })
    //   ).subscribe();
    // } else {
    //   this.submitted = true;
    // }
  }


  resetForm() {
    this.submitted = false;
    this.imgSrc = this.slide.image || 'assets/img/camera.svg';
    this.selectedImg = null; 
    this.formTemplate.reset();
    this.formTemplate.setValue({
      number: this.slide.position,
      description: this.slide.description,
      image: ''
    });
  }

  get fC() {
    return this.formTemplate['controls'];
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]){
      this.resize.getImgAsync(event.target.files[0])
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



}
