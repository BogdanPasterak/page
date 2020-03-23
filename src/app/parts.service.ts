import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { Part } from './part';
import { PARTS } from './mock-parts';

@Injectable({
  providedIn: 'root'
})

export class PartsService {

  private url: string = "assets/data/parts.json";
  partsDB: any[];

  // reference do node "parts"
  ref: firebase.database.Reference;

  partsRef: AngularFireList<Part> = null;

  constructor(db: AngularFireDatabase) {
      this.partsRef = db.list('parts');
  }

  createPart(part: Part): void {
    this.partsRef.push(part);
  }
 
  updatePart(key: string, value: any): Promise<void> {
    return this.partsRef.update(key, value);
  }
 
  deletePart(key: string): Promise<void> {
    return this.partsRef.remove(key);
  }
 
  getPartsList(): AngularFireList<Part> {
    return this.partsRef;
  }
 
  deleteAll(): Promise<void> {
    return this.partsRef.remove();
  }

}
