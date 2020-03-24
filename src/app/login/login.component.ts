import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

interface User {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: 'test@test.com',
    password: 'test1234'
  };

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async register() {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(
      this.user.email,
      this.user.password
    );
    console.log(user);
  }

}
