import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Part } from './part';
import { PARTS } from './mock-parts';

@Injectable({
  providedIn: 'root'
})

export class PartsService {

  private url: string = "assets/data/parts.json";

  constructor(private http: HttpClient) { }

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.url);
  }

}
