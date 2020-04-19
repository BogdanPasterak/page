import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Slide } from './slide';
import { FirebaseDatabase } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  slideRef: AngularFireList<Slide> = null;
  ref: firebase.database.Reference;

  constructor(db: AngularFireDatabase) {
    this.slideRef = db.list('slide');
    this.ref = db.database.ref('slide');
    // console.log("ref", this.doc);
  }


  createSlide(slide: Slide): void {
    this.slideRef.push(slide);
  }

  updateSlide(key: string, value: Slide): Promise<void> {
    return this.slideRef.update(key, value);
  }
 
  deleteSlide(key: string): Promise<void> {
    return this.slideRef.remove(key);
  }
 
  getSlideList(): AngularFireList<Slide> {
    return this.slideRef;
  }

  getSlideKeyByPosition(nr: number): Promise<any> {
    return this.ref.orderByChild('position').equalTo(nr).once('value')
    .then(snapshot => snapshot.val())
    .then(v => Object.keys(v)[0])
    .catch(err => new Error(err))
  }

  getNumberSlides(): Promise<any> {
    return this.ref.once('value')
    .then(snapshot => snapshot.val() || {})
    .then(v => Object.keys(v).length)
    .catch(err => {
      console.log("error", err)
      return new Error(err);
    })
    }

}
