import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import { IOrder } from 'src/app/shared/models/order.interface';

@Component({
  selector: 'app-check-order',
  templateUrl: './check-order.component.html',
  styleUrls: ['./check-order.component.scss'],
})
export class CheckOrderComponent implements OnInit {
  order: IOrder = new IOrder();
  checkForm!: FormGroup;

  constructor(
    cartService: CartService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private orderService: OrdersService,
    private router: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkForm = this.fb.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }

  get fc() {
    return this.checkForm.controls;
  }

  submit() {
    if (this.checkForm.invalid) {
      this.toastr.warning('Fill all required fields!');
      return;
    }

    if (!this.order.addressLatLng) {
      this.toastr.warning('Select location on the map!');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (errorResponse) => {
        console.log(errorResponse);
        this.toastr.error(errorResponse.statusText);
      },
    });
  }
}
