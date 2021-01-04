import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable()
  export class ClienteService {
  private  urlEndPoint:string = 'http:
  constructor(private http: HttpClient) { }
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint);
    }
  }
