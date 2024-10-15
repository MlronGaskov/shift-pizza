import { useCartInterface } from "../../hooks/useCart";
import "../../styles/payment/orderPopUp.css"
import cross from "../../assets/images/popUp/cross.svg"
import success from "../../assets/images/orderPopUp/success.svg"
import { NavLink } from "react-router-dom";
import { TwoLines } from "./TwoLines";
import { userAddress } from "../../schemes/user-address";
import { sizesNames, sizesValues, doughsNames, toppingsNames } from "../../constants";


interface OrderPopUpInterface {
    cart: useCartInterface,
    personAddress: userAddress,
}

export const OrderPopUp: React.FC<OrderPopUpInterface> = ({ cart, personAddress }) => {
    const getOrderInfo = () => {
        let orderInfo: Array<string> = [];
        for (let pizza of cart.getPizzas()) {
            const sizeName = sizesNames[pizza.size.name]
            const sizeValue = sizesValues[pizza.size.name]
            const doughName = doughsNames[pizza.doughs.name]
            let toppings = pizza.toppings.map((e) => toppingsNames[e.name]).join(", ");
            if (toppings.length != 0)
                toppings = " + " + toppings
            const pizzaInfo = `${pizza.name}, ${sizeName} ${sizeValue}, ${doughName} тесто ${toppings}\n`
            orderInfo.push(pizzaInfo);
        }
        return orderInfo;
    }

    const getAddressInfo = () => `Россия, г. Новосибирск, ул. ${personAddress.street}, д. ${personAddress.house}`;

    return (
        <div className="order-pop-up">
            <div className="order-pop-up-top">
                <NavLink to="/"><img src={cross} onClick={() => cart.setCart([])}/></NavLink>
            </div>
            <div className="order-pop-up-body">
                <img src={success}></img>
                <h1>Оплата прошла успешно!</h1>
                <div className="order-pop-up-details">
                    <TwoLines firstLine="Заказ" secondLines={getOrderInfo()}></TwoLines>
                    <TwoLines firstLine="Адрес доставки" secondLines={[getAddressInfo()]}></TwoLines>
                    <TwoLines firstLine="Сумма заказа" secondLines={[cart.getOrderCost().toString() + " р"]}></TwoLines>
                    <p>Вся информация была продублирована в SMS</p>
                </div>
                <NavLink to="/" onClick={() => cart.setCart([])}><div className="back-to-catalog">Перейти в главное меню</div></NavLink>
            </div>
        </div>
    );
}