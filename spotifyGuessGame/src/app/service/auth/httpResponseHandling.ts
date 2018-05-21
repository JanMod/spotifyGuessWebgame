import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NavigationService } from '../navigation.service';
import 'rxjs/add/operator/do';
import { ResponseSnackbarService } from '../responseSnackbarService/response-snackbar.service';

@Injectable()
export class HttpResponseHandling implements HttpInterceptor {
    constructor(private navigation: NavigationService, private snackbar: ResponseSnackbarService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status) {
                    this.snackbar.openSnackBar(err.error);
                    this.navigation.viewCreateUser();
                }
            }
        });
    }
}