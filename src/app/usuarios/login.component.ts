import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo: string = 'Por favor Loguéate';
  usuario: Usuario;
  constructor() {
    this.usuario = new Usuario();
  }
  ngOnInit() {
  }
  login(): void {
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacíos!', 'error');
      return;
    }
  }
}
