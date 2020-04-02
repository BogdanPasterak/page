import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Link } from '../link';
import { LINKS } from "../mock-links";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  linksLink:Link[] = LINKS;
  constructor() { }

  @Output() messageEvent = new EventEmitter<string>();

  ngOnInit(): void {
  }

  sendMessage(message: string) {
    this.messageEvent.emit(message.replace(/#/, ''));
  }

}
