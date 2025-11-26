import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
standalone: true,
selector: 'app-login',
imports: [FormsModule,
  CommonModule
],
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
email = '';
pass = '';
sala = '';
salas = ['Sala do Ursinho','Sala do Dino','Sala do Carrinho','Sala do Panda','Sala da Estrelinha'];
constructor(private auth: AuthService, private router: Router) {}


  login() {
    if (!this.sala) {
      return alert('Escolha uma sala')
    };
    this.auth.login(this.email, this.pass).subscribe({
      next: () => {
        localStorage.setItem('sala', this.sala);
        this.router.navigate(['/recepcao']);
      },
      error: e => alert('Erro no login')
    });
  }
}