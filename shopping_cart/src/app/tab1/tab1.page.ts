import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Resturant } from '../models/resturants';
import { CommonModule } from '@angular/common';
import { cart } from '../models/cart';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page {

  Resturants: Resturant[] = [];
  Cart!: cart;


  constructor() {}

  ngOnInit()
  {
    //Read from ls
    this.Resturants = JSON.parse(localStorage.getItem('Resturants')!);
    this.Cart = JSON.parse(localStorage.getItem('Cart')!);

    //Check my read data
    if(this.Resturants == null)
    {
      this.seedDb();
    }

    if(this.Cart == null)
    {
      //Initialise a new cart
      this.Cart = new cart(); 
    }  

  }

  seedDb()
  {
    this.Resturants = [];
    //Repeat n times for the items you want to show
    let resturant1 = new Resturant();resturant1.resturantId = 1;resturant1.resturantName = "KFC";resturant1.resturantTypeDish = "Chicken";resturant1.resturantImg = "assets/images/1.png"
        resturant1.resturantRating = 5;resturant1.resturantDistance = 2.36;resturant1.resturantDistanceTime = 25;resturant1.resturantDishPrice = 150;
    this.Resturants.push(resturant1);

    let resturant2 = new Resturant();resturant2.resturantId = 2;resturant2.resturantName = "Nandos";resturant2.resturantTypeDish = "Chicken";resturant2.resturantImg = "assets/images/2.jpg"
        resturant2.resturantRating = 3.5;resturant2.resturantDistance = 5.36;resturant2.resturantDistanceTime = 15;resturant2.resturantDishPrice = 199;
    this.Resturants.push(resturant2);
    localStorage.setItem('Resturants', JSON.stringify(this.Resturants));
  }

  addToCart(res:Resturant)
  {
    if(this.Cart.Resturant != null)
    {
        if(this.Cart.Resturant.resturantId == res.resturantId)
        {
          this.Cart.Resturant.orderquantity = this.Cart.Resturant.orderquantity + 1;
          this.saveCart();
        }
    }
    else
    {
        res.orderquantity = 1; 
        this.Cart.Resturant = res;
        this.saveCart();
    }
    
  }

  saveCart()
  {
     localStorage.removeItem('Cart');
     localStorage.setItem('Cart',JSON.stringify(this.Cart));
  }




}
