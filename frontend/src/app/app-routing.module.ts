import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { CheckOrderComponent } from './components/pages/check-order/check-order.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentComponent } from './components/pages/payment/payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchValue', component: HomeComponent },
  { path: 'tag/:tagValue', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'check-order',
    component: CheckOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
