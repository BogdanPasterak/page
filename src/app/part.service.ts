import { Injectable } from '@angular/core';
import { Part } from './part';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  private partSource = new BehaviorSubject<Part>(new Part);
  currentPart = this.partSource.asObservable();

  constructor() { }

  changePart(part: Part) {
    this.partSource.next(part);
  }
}
