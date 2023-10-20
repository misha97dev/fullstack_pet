import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  tags?: ITag[];
  constructor(foodService: FoodService) {
    foodService.getTags().subscribe((response) => {
      this.tags = response;
    });
  }
}
