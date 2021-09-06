import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo: string = 'Por favor Loguéate';
  usuario: Usuario;
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }
  ngOnInit() {
  }
    login(): void {
      console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      this.router.navigate(['/clientes']);
      swal.fire('Login', 'Hola ' + this.usuario.username + ', has iniciado sesión con éxito!', 'success');
    }, err => {
      if (err.status === 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    });
  }
}
