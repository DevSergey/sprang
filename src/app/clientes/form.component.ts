import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import { Region} from './region';
import { ClienteService} from './cliente.service';
import { Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo: string = 'Crear Cliente';
  private errores: string[];
  regiones: Region[];
  constructor(private clienteService: ClienteService, private router: Router, private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.cargarCliente();
  }
  cargarCliente(): void {
    this.activateRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id) {
          this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente);
        }
      });
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }
  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        console.log(cliente);
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `El cliente ${cliente.nombre}  ${cliente.apellido} ha sido creado con éxito.`, 'success');
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error(err.error.errors);
          console.error('Código del error desde el backend: ' + err.status);
        });
  }
  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(json => {
        console.log(json.mensaje);
        console.log(json.cliente);
        this.router.navigate(['/clientes']);
        swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}  ${json.cliente.apellido}`, 'success');
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error(err.error.errors);
          console.error('Código del error desde el backend: ' + err.status);
        });
  }
}
