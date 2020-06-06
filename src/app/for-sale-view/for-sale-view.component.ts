import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Part } from '../part';
import { PartService } from '../part.service';

@Component({
  selector: 'app-for-sale-view',
  templateUrl: './for-sale-view.component.html',
  styleUrls: ['./for-sale-view.component.css']
})
export class ForSaleViewComponent implements OnInit {

  part: Part;
  section: string = 'myPage';
  mainpage: boolean = true;
  login: boolean = false;
  data: any;

  constructor(private partService: PartService, private _router: Router) {
  }

  ngOnInit(): void {
    this.partService.currentPart.subscribe(p => this.part = p);
  }

  receiveMsg(event:string) {
    console.log(event);
    this._router.navigate([`#${event}`]);
  }

}
