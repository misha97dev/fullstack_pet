import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
var currentRequestsCount = 0;
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoader();

    currentRequestsCount++;
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            this.handleResponse();
          }
        },
        error: () => this.handleResponse(),
      })
    );
  }
  handleResponse() {
    currentRequestsCount--;
    if (currentRequestsCount === 0) this.loaderService.hideLoader();
  }
}
