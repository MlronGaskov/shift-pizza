import { useState } from 'react';
import { SelectedPizzaDetails } from '../schemes/selected-pizza-details-interface';
import { PizzaData } from '../schemes/pizza-data-interface';


export class CartItem {
    "pizzaDetails": SelectedPizzaDetails;
    "count": number;
    "isDeleted": boolean;
    "pizzaData": PizzaData;

    constructor(initPizzaDetails: SelectedPizzaDetails, pizzaData: PizzaData) {
        this.pizzaDetails = {...initPizzaDetails}
        this.count = 1;
        this.isDeleted = false;
        this.pizzaData = pizzaData;
    }

    setDetails(d: SelectedPizzaDetails): void {
        this.pizzaDetails = {...d}
    }

    increaseCount(): void {
        if (this.isDeleted == false)
            this.count += 1;
    }

    decreaseCount(): void {
        if (this.isDeleted == true)
            return;
        this.count -= 1;
        if (this.count == 0)
            this.isDeleted = true;
    }

    deleteItem(): void {
        this.count = 0;
        this.isDeleted = true;
    }

    getPizzaCost(): number {
        let cartItemCost = this.pizzaDetails.size.price + this.pizzaDetails.doughs.price;
        for (let topping of this.pizzaDetails.toppings)
            cartItemCost += topping.cost
        return this.count * cartItemCost;
    }
}


export interface useCartInterface {
    "addToCart": (e: SelectedPizzaDetails, d: PizzaData) => void,
    "cartItems": Array<CartItem>,
    "setCart": React.Dispatch<React.SetStateAction<CartItem[]>>,
    "getPizzas": () => Array<SelectedPizzaDetails>,
    "getOrderCost": () => number,
}


const useCart = (): useCartInterface => {
    const [cart, setCart] = useState<Array<CartItem>>([]);
    
    const addToCart = (e: SelectedPizzaDetails, d: PizzaData) => {
        const cartItem = new CartItem(e, d);
        const newCart = [...cart];
        newCart.push(cartItem);
        setCart(newCart);
    }

    const getPizzas = () => {
        const pizzas = [];
        for (let cartItem of cart) {
            for (let i = 0; i < cartItem.count; ++i)
                pizzas.push(cartItem.pizzaDetails);
        }
        return pizzas;
    }

    const getOrderCost = () => {
        let cost = 0;
        for (let cartItem of cart) {
            cost += cartItem.getPizzaCost();
        }
        return cost;
    }

    return {
        "addToCart": addToCart,
        "cartItems": cart,
        "getPizzas": getPizzas,
        "setCart": setCart,
        "getOrderCost": getOrderCost,
    };								 
}

export default useCart;