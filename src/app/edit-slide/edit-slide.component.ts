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
    image: new FormControl('')
  })

  submitted: boolean;
  imgSrc: string | ArrayBuffer;
  selectedImg: any;
  numberSlides: number;

  @Input() slide: Slide;

  constructor(
    private slidesService: SlidesService,
    private storage: AngularFireStorage,
    private resize: ImageResizeService
) { }

  ngOnInit(): void {
    this.resetForm();
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

  delete() {
    this.slidesService.getNumberSlides()
    .then(amount => {
      // console.log(this.slide.position, amount);
      this.storage.storage.refFromURL(this.slide.image).delete();
      this.slidesService.deleteSlide(this.slide.key);
      // corecting position
      for (let index = this.slide.position + 1; index < amount; index++) {
        this.slidesService.getSlideKeyByPosition(index)
        .then(key => {
          this.slidesService.updateSlide(key, {position: index - 1} as Slide)
        });
      }
    })
  }

  moveUp () {
    this.slidesService.getSlideKeyByPosition(this.slide.position - 1)
    .then(key => {
      this.slidesService.updateSlide(key, {position: this.slide.position} as Slide);
      this.slidesService.updateSlide(this.slide.key, {position: this.slide.position - 1} as Slide);
    })

  }

  onSubmit(formValue) {

    if (this.formTemplate.valid){
      if (this.selectedImg) {
        // change image
        let filePath =`imagesSlaids/${this.selectedImg.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);

          this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.storage.storage.refFromURL(this.slide.image).delete();
                formValue['image'] = url;
                this.slidesService.updateSlide(this.slide.key, {
                  image: url,
                  description: formValue['description'],
                  position: formValue['number']
                } as Slide);
                this.resetForm();
              })
            })
          ).subscribe();
      } else if (this.formTemplate.controls.description.dirty) {
        this.slide.description = this.formTemplate.controls.description.value;
        this.slidesService.updateSlide(this.slide.key, {
          description: this.slide.description
        } as Slide);
      }
    } else {
      this.submitted = true;
    }
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
