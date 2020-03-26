import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  newUser: User;
  form: boolean;

  @Input() data : any;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.user = new User();
    this.newUser = new User();
    this.form = false;
  }

  @Output() messageEvent = new EventEmitter<string>();

  async register() {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(
      this.newUser.email,
      this.newUser.password
    );
  }

  async login() {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(
      this.user.email,
      this.user.password
    );
    
    console.log(user);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.messageEvent.emit('forsale');
  }

  loginForm() {
    this.form = true;
  }

}
