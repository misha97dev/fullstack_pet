import { Injectable } from '@angular/core';
import { IFood } from '../shared/models/food.interface';
import { sample_foods, sample_tags } from 'src/assets/data';
import { ITag } from '../shared/models/tag.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IFood[]> {
    return this.http.get<IFood[]>(`${environment.baseUrl}food`);
  }
  getBySearch(value: string): Observable<IFood[]> {
    return this.http.get<IFood[]>(`${environment.baseUrl}food/search/${value}`);
  }
  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(`${environment.baseUrl}food/tag`);
  }
  getByTag(tag: string): Observable<IFood[]> {
    return this.http.get<IFood[]>(`${environment.baseUrl}food/tag/${tag}`);
  }
  getById(id: string): Observable<IFood> {
    return this.http.get<IFood>(`${environment.baseUrl}food/${id}`);
  }
}
