import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { IOrder } from 'src/app/shared/models/order.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  order: IOrder = new IOrder();
  constructor(private orderService: OrdersService, private router: Router) {
    orderService.getNewOrder().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        router.navigateByUrl('check-order');
      },
    });
  }
}
