import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap} from 'rxjs/operators';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  constructor(private clienteService: ClienteService) {
  }
  ngOnInit() {
    this.clienteService.getClientes().pipe(
      tap(clientes => {
        console.log('ClientesComponent: tap 3')
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    ).subscribe(clientes => this.clientes = clientes);
  }
  delete(cliente: Cliente): void {
    swal.fire({
      title: 'Estás seguro de borrar este cliente?',
      text: `No podrás volver a recuperar a ${cliente.nombre} ${cliente.apellido}!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, elimina a ${cliente.nombre} ${cliente.apellido}!`
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli =>cli !== cliente)
            swal.fire(
              'Borrado!',
              'Tu cliente ha sido eliminado.',
              'success'
            )
          }
        )
      }
    })
  }
}
