import { useQuery } from "react-query";
import { Header } from "../../../components/header/Header";
import { useAuthTokenInterface } from "../../../hooks/useAuthToken";
import { ordersData } from "../../../schemes/orders-data";
import { fetchOrders } from "../../api/requests";
import greenStatus from "../../../assets/images/orders/greenStatus.svg"
import redStatus from "../../../assets/images/orders/redStatus.svg"
import { statuses } from "../../../constants";
import { NavLink } from "react-router-dom";

import  "../../../styles/orders/orders.css"

export const OrdersRoute: React.FC<{authorization: useAuthTokenInterface}> = ({authorization}) => {
  const { 
    isLoading, 
    isError, 
    data 
  } = useQuery<ordersData>("ordersData", () => fetchOrders(authorization.token));

  if (isLoading)
    return <h1>Loading</h1>

  if (isError)
    return <h1>Error</h1>


  const getOrderCard = (index: number) => {
    const orderInfo = {"pizzas": JSON.parse(data!.orders[index]!.receiverAddress.comment).info, ...data!.orders[index]};
    const addressInfo = `Россия, г. Новосибирск, ул. ${orderInfo.receiverAddress.street}, д. ${orderInfo.receiverAddress.house}`;
    let pizzasInfo = <p>{orderInfo.pizzas.map((e: {name: string}, idx: number) => <span key={idx}>{e.name}<br key={idx}/></span>)}</p>;

    return <div className="order-block" key={index}>
      <div className="orders-divider" ></div>
      <div className="orders-card">
        <div className="order-status"><img src={orderInfo.status == 4 ? redStatus : greenStatus}/>{" "}{statuses[orderInfo.status]}</div>
        <div className="order-address">{addressInfo}</div>
        <div className="order-pizzas">{pizzasInfo}</div>
        <NavLink to={"/orders/"+data!.orders[index]!._id} className="order-more-info">Подробнее</NavLink>
      </div>
    </div>
  }

  return (
    <div>
      <Header authorization={authorization}></Header>
			<div className="orders-cards">
        <div className="orders-header-card">
          <p>Статус</p>
          <p>Адрес доставки</p>
          <p>Состав заказа</p>
          <p> </p>
        </div>
        {data!.orders.map((_e, index) => getOrderCard(index))}
      </div>

		</div>
  );
};
