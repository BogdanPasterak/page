import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Slide } from '../slide';
import { map } from 'rxjs/operators';
import { SlidesService } from '../slides.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  slides: Slide[];

  constructor(public afAuth: AngularFireAuth, private slidesService: SlidesService) { }

  ngOnInit(): void {
    this.slidesService.getSlideList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(slides => {this.slides = slides});
  }

  sortPos() {
    return this.slides.sort((a, b) => a.position > b.position ? 1 : -1);
  }

}
