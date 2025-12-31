import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Placeholder Components - actual components will be imported here later
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: MyCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile', component: MyProfileComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '' } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
