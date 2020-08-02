import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isLoggedIn()) {
      const reqWithAuth = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getJwt()}`,
        },
      });
      return next.handle(reqWithAuth);
    } else {
      return next.handle(req);
    }
  }
}
