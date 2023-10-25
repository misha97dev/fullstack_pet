import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule } from 'ng-starrating';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FieldComponent } from './components/partials/field/field.component';
import { FieldErrorComponent } from './components/partials/field/field-error/field-error.component';
import { FieldContentComponent } from './components/partials/field/field-content/field-content.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { LoaderComponent } from './components/partials/loader/loader.component';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { CheckOrderComponent } from './components/pages/check-order/check-order.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { PaypalBtnComponent } from './components/partials/paypal-btn/paypal-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartComponent,
    NotFoundComponent,
    LoginComponent,
    FieldComponent,
    FieldErrorComponent,
    FieldContentComponent,
    RegistrationComponent,
    LoaderComponent,
    CheckOrderComponent,
    MapComponent,
    PaymentComponent,
    PaypalBtnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      newestOnTop: false,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
