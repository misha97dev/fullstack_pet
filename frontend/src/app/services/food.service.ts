import { Injectable } from '@angular/core';
import { IFood } from '../shared/models/food.interface';
import { sample_foods, sample_tags } from 'src/assets/data';
import { ITag } from '../shared/models/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): IFood[] {
    return sample_foods;
  }
  getBySearch(value: string) {
    return this.getAll().filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
  }
  getTags(): ITag[] {
    return sample_tags;
  }
  getByTag(tag: string): IFood[] {
    if (tag.toLowerCase() === 'all') {
      return this.getAll();
    }
    return this.getAll().filter((item) =>
      item.tags?.some((tagItem) =>
        tagItem.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }
  getById(id: string): IFood {
    return this.getAll().find((item) => item.id == id)!;
  }
}
