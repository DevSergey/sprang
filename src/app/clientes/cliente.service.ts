import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router} from '@angular/router';
import {DatePipe} from '@angular/common';
@Injectable()
  export class ClienteService {
  private  urlEndPoint:string = 'http:
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) { }
  getClientes(page: number): Observable<any> {
    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),
      tap((response: any) => {
        console.log('ClienteService: tap 2 con map');
        (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
        });
      })
    );
    }
    create(cliente: Cliente): Observable<Cliente> {
      return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
        map((response: any) => response.cliente as Cliente),
        catchError(e => {
          if(e.status==400)
          {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al crear', e.error.error, 'error');
          return throwError(e);
         }
        )
      )
    }
    getCliente(id): Observable<Cliente> {
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
          }
        )
      )
    }
    update(cliente: Cliente): Observable<any> {
      return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
        catchError(e => {
          if(e.status==400)
          {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.error, 'error');
          return throwError(e);
          }
        )
      )
    }
    delete(id: number): Observable<Cliente> {
      return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e => {
            console.error(e.error.mensaje);
            swal.fire('Error al eliminar', e.error.error, 'error');
            return throwError(e);
          }
        )
      )
    }
  }
