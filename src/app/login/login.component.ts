import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedUser: User;
  newUser: User;
  form: boolean;
  newItem: boolean;

  @Input() data : any;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.loggedUser = new User();
    this.newUser = new User();
    this.form = false;
    this.newItem = false;
  }

  @Output() messageEvent = new EventEmitter<string>();

  async register() {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(
      this.newUser.email,
      this.newUser.password
    );
  }

  async login() {
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loggedUser.email,
      this.loggedUser.password
    ).then(res =>{
      this.loggedUser.password = "";
    }).catch(err => {
      console.log(err.message);
    })
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.messageEvent.emit('forsale');
  }

  receiveMsg($event) {
    if ($event == "cancel"){
      this.newItem = false;
    }
  }

  cancel() {
    this.messageEvent.emit('forsale');
  }

  cancelNewAdmin() {
    this.form = false;
  }

  loginForm() {
    this.form = true;
  }

  addNewItem() {
    this.newItem = true;
  }

}
