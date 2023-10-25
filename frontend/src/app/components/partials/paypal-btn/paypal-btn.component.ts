import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { IOrder } from 'src/app/shared/models/order.interface';

declare var paypal: any;

@Component({
  selector: 'app-paypal-btn',
  templateUrl: './paypal-btn.component.html',
  styleUrls: ['./paypal-btn.component.scss'],
})
export class PaypalBtnComponent implements OnInit {
  @Input() order!: IOrder;

  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private orderService: OrdersService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              },
            },
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe({
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toastr.success('Payment Saved Successfully');
            },
          });
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
