import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/food/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartComponent } from './components/pages/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchValue', component: HomeComponent },
  { path: 'tag/:tagValue', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
