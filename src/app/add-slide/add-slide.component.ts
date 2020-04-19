import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageResizeService } from '../image-resize.service';
import { DataFile } from '../dataFile';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Slide } from '../slide';
import { SlidesService } from '../slides.service';

@Component({
  selector: 'app-add-slide',
  templateUrl: './add-slide.component.html',
  styleUrls: ['./add-slide.component.css']
})
export class AddSlideComponent implements OnInit {

  formTemplate = new FormGroup({
    number: new FormControl(null, [Validators.max(19), Validators.min(0)]),
    description: new FormControl('', Validators.minLength(3)),
    image: new FormControl('', Validators.required)
  })

  adding: boolean = false;
  submitted: boolean;
  imgSrc: string | ArrayBuffer;
  selectedImg: any;

  constructor(
    private slidesService: SlidesService,
    private storage: AngularFireStorage,
    private resize: ImageResizeService
    ) { }

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




  ngOnInit(): void {
    this.resetForm();
  }

  addSlide () {
    this.adding = true;
  }

  cancel() {
    this.adding = false;
    this.resetForm();
  }

  onSubmit(formValue) {

    if (this.formTemplate.valid){
      this.adding = false;

      let filePath =`imagesSlaids/${this.selectedImg.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() => {
          
          fileRef.getDownloadURL().subscribe((url) => {
            this.slidesService.getNumberSlides()
            .then(nr => {
              // console.log("nr", nr);
              this.slidesService.createSlide({
                image: url,
                description: formValue['description'],
                position: nr || 0
              } as Slide);
              });
            this.resetForm();
          })
        })
      ).subscribe();
    } else {
      this.submitted = true;
    }
  }



  get fC() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.submitted = false;
    this.imgSrc = 'assets/img/camera.svg';
    this.selectedImg = null; 
    this.formTemplate.reset();
    this.formTemplate.setValue({
      number: 0,
      description: '',
      image: ''
    })

  }


}
