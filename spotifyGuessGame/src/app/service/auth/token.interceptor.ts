import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { NavigationService } from '../navigation.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private user: UserService, private navigation: NavigationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.user.getToken();
        if (!token) {
            this.navigation.viewCreateUser();
        }
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.user.getToken()}`
            }

        });
        return next.handle(request);
    }
}