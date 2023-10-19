import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { IFood } from 'src/app/shared/models/food.interface';

@Component({
  selector: 'app-food',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  food: IFood[] = [];
  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.searchValue) {
        this.food = this.foodService.getBySearch(params.searchValue);
      } else if (params.tagValue) {
        this.food = this.foodService.getByTag(params.tagValue);
      } else {
        this.getAll();
      }
    });
  }
  getAll() {
    this.food = this.foodService.getAll();
  }
}
