import { Injectable } from '@angular/core';
import { IOrder } from '../shared/models/order.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  create(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`${environment.baseUrl}orders/create`, order);
  }

  getNewOrder(): Observable<IOrder> {
    return this.http.get<IOrder>(`${environment.baseUrl}orders/new-order`);
  }

  pay(order: IOrder): Observable<string> {
    return this.http.post<string>(`${environment.baseUrl}orders/pay`, order);
  }
}
