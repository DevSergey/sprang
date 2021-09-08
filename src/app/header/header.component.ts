import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  title: string = 'App Angular';
  constructor(private authService: AuthService, private router: Router) {}
  logout(): void {
    let username: string = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, estás cerrando tu sesión.`,'success');
    this.router.navigate(['/login']);
  }
}
