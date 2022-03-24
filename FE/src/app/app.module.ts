import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PricePipe } from './pipes/price.pipe';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './page/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from './components/brand/brand.component';
import { LoginComponent } from './page/login/login.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductComponent } from './page/product/product.component';
import { ProductDetailComponent } from './page/product/product-detail/product-detail.component';
import { CartComponent } from './page/cart/cart.component';
import { InfoCartComponent } from './page/cart/info-cart/info-cart.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    ProductDetailComponent,
    InfoCartComponent,
    BrandComponent,
    LoginComponent,
    PricePipe,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-left',
      progressBar: true,
      preventDuplicates: false,
    }),
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
