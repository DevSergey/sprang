import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {AuthService} from '../auth.service';
import swal from 'sweetalert2';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }
        if (e.status === 403) {
          swal.fire('Acceso Denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso.`, 'warning');
          this.router.navigate(['/login']);
        }
        return throwError(e);
      })
    );
  }
}
