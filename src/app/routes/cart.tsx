import { Header } from "../../components/header/Header";
import { useAuthTokenInterface } from "../../hooks/useAuthToken";
import { useCartInterface } from "../../hooks/useCart";
import { backendUrl } from "../api/requests";
import { doughsNames, sizesNames, sizesValues, toppingsNames } from "../../constants";
import crossLogo from "../../assets/images/popUp/cross.svg"
import usePopUp from "../../hooks/usePopUp";
import { PopUp } from "../../components/popUp/PopUp";
import { useState } from "react";
import "../../styles/cart/cart.css";
import { NavLink } from "react-router-dom";


export const CartRoute: React.FC<{authorization: useAuthTokenInterface, cart: useCartInterface}> = ({authorization, cart}) => {
	const popUp = usePopUp();
	let [itemIndex, setItemIndex] = useState(0);

	const getCartItem = (index: number) => {
		if (cart.cartItems[index].count == 0)
			return <div key={index} className="empty"></div>

		const itemCounterIncrease = () => {
			const newCart = [...cart.cartItems];
			newCart[index].increaseCount();
			cart.setCart(newCart);
		}

		const itemCounterDecrease = () => {
			const newCart = [...cart.cartItems];
			newCart[index].decreaseCount();
			cart.setCart(newCart);
		}

		const itemDelete = () => {
			const newCart = [...cart.cartItems];
			newCart[index].deleteItem();
			cart.setCart(newCart);
		}

		const itemCounter = 
			<div className="cart-item-counter">
				<div className="cart-item-common-space">
					<div className="cart-item-control">
						<p onClick={itemCounterDecrease}>-</p>
						<p>{cart.cartItems[index].count}</p>
						<p onClick={itemCounterIncrease}>+</p>
					</div>
				</div>
			</div>

		const itemChange = () => {
			popUp.selectPizza(cart.cartItems[index].pizzaData, cart.cartItems[index].pizzaDetails);
		}

		const cartItemDetails = cart.cartItems[index].pizzaDetails
		const sizeName = sizesNames[cartItemDetails.size.name]
		const sizeValue = sizesValues[cartItemDetails.size.name]
		const doughName = doughsNames[cartItemDetails.doughs.name]
		let toppings = cartItemDetails.toppings.map((e) => toppingsNames[e.name]).join(", ");
		if (toppings.length != 0)
			toppings = " + " + toppings

		const pizzaInfo = `${sizeName} ${sizeValue}, ${doughName} тесто ${toppings}`

		return <div className="cart-item" key={index}>
				<img src={backendUrl + cart.cartItems[index].pizzaData.img} className="cart-item-pizza-image"></img>
				<p className="cart-item-pizza-name">{cart.cartItems[index].pizzaDetails.name}</p>
				<p className="cart-item-pizza-info">{pizzaInfo}</p>
				{itemCounter}
				<p className="cart-item-change" onClick={() => {setItemIndex(index); itemChange()}}>Изменить</p>
				<p className="cart-item-pizza-price">{cart.cartItems[index].getPizzaCost()} р</p>
				<img src={crossLogo} className="cart-item-cross" onClick={itemDelete}></img>
			</div>
	}

	return (
		<div>
			{popUp.isPopUpOpen ? <PopUp popUp={popUp} onChange={{"cart": cart, "index": itemIndex}}></PopUp> : null}
			{popUp.isPopUpOpen && <div className="dark-overlay" onClick={popUp.closePopUp}/>}
			<Header authorization={authorization}></Header>
			<div className="cart-items">
				{cart.cartItems.map((_e, index) => getCartItem(index))}
				<div className="cart-divider"></div>
				<div className="order">
					<div className="order-cost">
						<div>Стоимость заказа: </div><div>{cart.getOrderCost()}p</div>
					</div>
					<NavLink className="text-decoration-none" to="/payment">
					<div className="order-placing-button">Оформить заказ</div>
					</NavLink>
				</div>
			</div>
		</div>
	);
};
