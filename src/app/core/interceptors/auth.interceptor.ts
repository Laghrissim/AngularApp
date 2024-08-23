import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const authToken = this.authService.getToken();

    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log("iswith token")
      return next.handle(authReq);

    }

    console.log("is not with token")

    return next.handle(req);
  }
}
