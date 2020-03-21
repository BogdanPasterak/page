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


      // this.items.forEach(next => next.map(i =>{
      //   if (i.name == ("Mug")){
      //     console.log(i, i.$key);
      //   }
      // }));


      this.ref = db.database.ref('parts');
      // this.ref.once('value',
      //   data => {
      //     // console.log("data", data.val());
      //     let usrData = data.val();
      //     // console.log("keys", Object.keys(data.val()));
      //     let keys = Object.keys(usrData);
      //     for (let i = 0; i < keys.length; i++) {
      //       const key = keys[i];
      //       const d = usrData[key];
      //       let partID: Part = {
      //         id: Number.parseInt(key),
      //         name: d.name,
      //         description: d.description,
      //         image: d.image,
      //         quantity: Number.parseInt(d.quantity),
      //         price: Number.parseFloat(d.price)
      //       };

      //       console.log(partID);
      //     }
      //   }
      //   , error => console.log(error)
      // );



      // let object = db.list('parts').snapshotChanges().subscribe(
      //   p => {
      //     let iterator = p.values();
      //     console.log(iterator.next().value.key);
      //     console.log(iterator.next().value.key);
      //     console.log(iterator.next());
      //   }
      // );
      //console.log("object", object);


      // Add one child
      // this.ref.child("5").set(
        
      //   // {"name": "Glasses", "quantity": 2, "price": 3.75, "description": "My glasses", "image": "assets/img/img-parts/glasses.jpg" }
      //   {"name": "Big Mug", "quantity": 1, "price": 4.00,
      //     "description": "Grapple salmagundi Jack Tar Corsair Shiver me timbers landlubber or just lubber reef sails topgallant barkadeer draught. Barkadeer topmast gabion long boat capstan smartly red ensign crack Jennys tea cup Letter of Marque swing the lead. Snow gaff chase guns splice the main brace Sea Legs hearties league list careen quarter.",
      //     "image": "assets/img/img-parts/mug.jpg" }
      // );

  }

  getParts(): Observable<Part[]> {
    // return this.http.get<Part[]>(this.url);
    return this.items;
  }

}
