import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpEvent,  HttpRequest} from '@angular/common/http';
import { map, catchError, tap} from 'rxjs/operators';
import { Router} from '@angular/router';
import {Region} from './region';
@Injectable()
  export class ClienteService {
  private  urlEndPoint: string = 'http:
  constructor(private http: HttpClient,
              private router: Router) { }
  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
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
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
         })
      );
    }
    getCliente(id): Observable<Cliente> {
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if (e.status !== 401 && e.error.mensaje) {
            this.router.navigate(['/clientes']);
            console.error(e.error.mensaje);
          }
          return throwError(e);
          })
      );
    }
    update(cliente: Cliente): Observable<any> {
      return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
        catchError(e => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
          })
      );
    }
    delete(id: number): Observable<Cliente> {
      return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
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
      return this.http.request(req);
    }
  }
