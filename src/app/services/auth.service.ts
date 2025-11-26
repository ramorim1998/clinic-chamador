import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
constructor(private auth: Auth) {}


  login(email: string, pass: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, pass));
  }


  logout(): Observable<any> { 
    return from(signOut(this.auth)); 
  }
}