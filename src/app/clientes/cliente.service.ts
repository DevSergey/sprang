import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router} from '@angular/router';
import {Region} from './region';
import {AuthService} from '../usuarios/auth.service';
@Injectable()
  export class ClienteService {
  private  urlEndPoint:string = 'http:
  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }
  private isNoAutorizado(e): boolean {
    if (e.status === 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status === 403) {
      swal.fire('Acceso Denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso.`, 'warning' );
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones').pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      }));
  }
  getClientes(page: number): Observable<any> {
    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
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
        });
      })
    );
    }
    create(cliente: Cliente): Observable<Cliente> {
      return this.http.post(this.urlEndPoint, cliente).pipe(
        map((response: any) => response.cliente as Cliente),
        catchError(e => {
          if(this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status === 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al crear', e.error.error, 'error');
          return throwError(e);
         })
      );
    }
    getCliente(id): Observable<Cliente> {
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)) {
            return throwError(e);
          }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
          })
      );
    }
    update(cliente: Cliente): Observable<any> {
      return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status === 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.error, 'error');
          return throwError(e);
          })
      );
    }
    delete(id: number): Observable<Cliente> {
      return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al eliminar', e.error.error, 'error');
          return throwError(e);
        })
      );
    }
    subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
      let formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("id", id);
      const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
        reportProgress: true
      });
      return this.http.request(req).pipe(catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      }));
    }
  }
