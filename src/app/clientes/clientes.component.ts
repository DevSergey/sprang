import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap} from 'rxjs/operators';
import { ActivatedRoute} from '@angular/router';
import {ModalService} from './detalle/modal.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginator: any;
  clienteSeleccionado: Cliente;
  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService) {  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page)
        .pipe(
          tap((response: any) => {
            console.log('ClientesComponent: tap 3');
            (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginator = response;
        });
    });
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
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire('Borrado!','Tu cliente ha sido eliminado.','success')
          });
      }
    });
  }
  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
