import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Part } from './part';
import { PARTS } from './mock-parts';

@Injectable({
  providedIn: 'root'
})

export class PartsService {

  constructor() { }

  getParts(): Observable<Part[]> {
    return of(PARTS);
  }

}
