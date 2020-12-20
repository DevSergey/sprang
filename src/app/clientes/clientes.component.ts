import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [
    { id: 1, nombre: 'Andrés', apellido: 'Guzmán', email: 'ag@gmail.com', createdAt: '2019-07-19' },
    { id: 2, nombre: 'Andrés', apellido: 'Gutierrez', email: 'ag2@gmail.com', createdAt: '2019-07-19' },
    { id: 3, nombre: 'Luis', apellido: 'Guzmán', email: 'lg@gmail.com', createdAt: '2019-07-19' },
    { id: 4, nombre: 'Pablo', apellido: 'Guzmán', email: 'pg@gmail.com', createdAt: '2019-07-19' },
    { id: 5, nombre: 'Fernando', apellido: 'Cárcel', email: 'fc@gmail.com', createdAt: '2019-07-18' },
    { id: 6, nombre: 'Andrés', apellido: 'Guzmán', email: 'ag@gmail.com', createdAt: '2019-07-19' },
    { id: 7, nombre: 'Rasmus', apellido: 'Cárcel', email: 'rc@gmail.com', createdAt: '2019-07-19' }
  ];
  constructor() { }
  ngOnInit() {
  }
}
