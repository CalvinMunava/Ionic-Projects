import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Resturant } from '../models/resturants';
import { cart } from '../models/cart';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class Tab2Page {

  Resturants: Resturant[] = [];
  searchedResturants: Resturant[] = [];
  Cart!: cart;
  searchString: string = "";


  constructor() {}

  ngOnInit()
  {
    this.Resturants = JSON.parse(localStorage.getItem('Resturants')!);
    this.Cart = JSON.parse(localStorage.getItem('Cart')!);
    if(this.searchString == "")
    {
      this.searchedResturants = this.Resturants;
    }
  }

  Search()
  {
      this.searchedResturants = [];

      //Searched the key name
      this.searchedResturants = this.Resturants.filter(
        (foodItem) => 
                         foodItem.resturantName.toLowerCase().includes(this.searchString.toLowerCase())  //Searching the res Name 
                      || foodItem.resturantTypeDish.toLowerCase().includes(this.searchString.toLowerCase())  //Searching the dish
                      || foodItem.resturantRating == Number(this.searchString.toLowerCase()) //Searching the rating
                      || foodItem.resturantDishPrice == Number(this.searchString.toLowerCase()) //Searching the price
                      || foodItem.resturantDistance == Number(this.searchString.toLowerCase()) //Searching the distance
                        
                        );      
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
