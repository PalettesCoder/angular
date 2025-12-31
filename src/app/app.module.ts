import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import for forms

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { QuantityComponent } from './components/quantity/quantity.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './components/hero/hero.component';
import { RecommendedProductsComponent } from './components/recommended-products/recommended-products.component';

// Pipes
import { ProductSearchPipe } from './pipes/product-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    FilterModalComponent,
    QuantityComponent,
    LoginComponent,
    SignupComponent,
    SignupModalComponent,
    MyCartComponent,
    MyProfileComponent,
    CheckoutComponent,
    ProductSearchPipe,
    HomeComponent,
    HeroComponent,
    RecommendedProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Required for template-driven forms, though we'll use ReactiveForms mainly
    ReactiveFormsModule // Required for reactive forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
