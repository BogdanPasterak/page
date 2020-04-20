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
    ).subscribe(slides => {
      this.slides = slides;
      // build carousel
      this.fillCarousel(slides);
    });
  }

  fillCarousel(slides: Slide[]): void {
    let ci = document.querySelector('.carousel-indicators');
    let cl = document.querySelector('.carousel-inner');

    if (ci && cl) {
      for (let index = 0; index < slides.length; index++) {
        const slide = slides[index];
        // console.log(`slide ${index}:`,slide);
  
        const li = document.createElement('li');
        li.setAttribute('data-slide-to', index.toString());
        li.setAttribute('data-target', '#myCarousel');
        if (index == 0) { li.classList.add('active'); }
        // console.log("li:",li);
        // console.log("ci:",ci);
        ci.appendChild(li);
  
        const divItem = document.createElement('div');
        divItem.classList.add('item');
        if (index == 0) { divItem.classList.add('active'); }
        const image = document.createElement('img');
        image.setAttribute('src', slide.image);
        const divCap = document.createElement('div');
        divCap.classList.add('carousel-caption');
        const caption = document.createTextNode(slide.description);
        divCap.appendChild(caption);
        divItem.appendChild(image);
        divItem.appendChild(divCap);
        cl.appendChild(divItem);
      }
  
    }

    // li.appendChild(document.createTextNode('text'));

    // console.log("c-i", ci)

  }

  sortPos() {
    return this.slides.sort((a, b) => a.position > b.position ? 1 : -1);
  }

}
