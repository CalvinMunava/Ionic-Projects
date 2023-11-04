import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { cart } from '../models/cart';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule],
})
export class Tab3Page {

  cart: cart = new cart();
  showCart:boolean = false;

  constructor() {}

  ngOnInit()
  {
    this.cart = JSON.parse(localStorage.getItem('Cart')!);
    if(this.cart == null)
    {
      this.showCart = false;
    }
    else
    {
      this.showCart = true;
    }
  }

  clearCart()
  {
    localStorage.removeItem('Cart');
    this.cart = new cart();
    this.ngOnInit();
  }

  reduceFromCart()
  {
    if(this.cart.Resturant != null)
    {
        if(this.cart.Resturant.resturantId == this.cart.Resturant.resturantId)
        {
          if(this.cart.Resturant.orderquantity != 0 )
          {
            this.cart.Resturant.orderquantity = this.cart.Resturant.orderquantity - 1;
          }
          else
          {
            this.clearCart();
            return
          }
          this.saveCart();
        }
    }
  }

  saveCart()
  {
     localStorage.removeItem('Cart');
     localStorage.setItem('Cart',JSON.stringify(this.cart));
     this.ngOnInit();
  }



}

