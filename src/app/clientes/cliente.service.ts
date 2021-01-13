import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable()
  export class ClienteService {
  private  urlEndPoint:string = 'http:
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient) { }
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint);
    }
    create(cliente: Cliente): Observable<Cliente> {
      return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
    }
  }
