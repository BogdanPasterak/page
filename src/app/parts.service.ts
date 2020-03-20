import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
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

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  data: any[];

  constructor(
    private http: HttpClient,
    db: AngularFireDatabase) {
      this.items = db.list('parts').valueChanges();
      this.ref = db.database.ref('parts')

      // db.list('parts').push({
      //   content:
      //     { "id": 1, "name": "Glasses", "quantity": 2, "price": 3.75, "description": "My glasses", "image": "assets/img/img-parts/glasses.jpg" }
      //   // { "id": 3, "name": "Mug", "quantity": 10, "price": 1.99, "description": "My mug with coffe inside, very hot", "image": "assets/img/img-parts/mug.jpg" }
      // });
      // ref.child("2").set(
        
      //   {"name": "Glasses", "quantity": 2, "price": 3.75, "description": "My glasses", "image": "assets/img/img-parts/glasses.jpg" }
      //   // {"name": "Mug", "quantity": 10, "price": 1.99, "description": "My mug with coffe inside, very hot", "image": "assets/img/img-parts/mug.jpg" }
      // );

      // console.log('db.database', db.database.ref('parts'));
      // this.itemsRef = db.list('parts');
      // console.log('ref', this.itemsRef);
      // this.items = this.itemsRef.valueChanges();
      // console.log('item', this.items);
      // this.items.subscribe(p => console.log('parts',p));
  }

  getParts(): Observable<Part[]> {
    // return this.http.get<Part[]>(this.url);
    return this.items
  }

}
