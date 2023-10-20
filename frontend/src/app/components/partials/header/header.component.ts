import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  totalItemsCart: number = 0;
  user!: IUser;
  constructor(cartService: CartService, private userService: UserService) {
    cartService.getCartObservable().subscribe((cart) => {
      this.totalItemsCart = cart.totalCount;
    });

    userService.userObservable.subscribe((user) => {
      this.user = user;
    });
  }
  logout() {
    this.userService.logout();
  }
}
