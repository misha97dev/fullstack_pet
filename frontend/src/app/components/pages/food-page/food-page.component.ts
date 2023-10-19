import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { IFood } from 'src/app/shared/models/food.interface';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss'],
})
export class FoodPageComponent {
  food!: IFood;
  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.food = foodService.getById(params.id);
      }
    });
  }
  addToCart() {
    this.cartService.addFood(this.food);
    this.router.navigateByUrl('/cart');
  }
}
