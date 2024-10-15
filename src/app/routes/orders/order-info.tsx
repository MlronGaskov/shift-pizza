import { useQuery } from "react-query";
import { Header } from "../../../components/header/Header";
import { useAuthTokenInterface } from "../../../hooks/useAuthToken";
import { orderData } from "../../../schemes/order-data";
import { fetchOrder } from "../../api/requests";

import "../../../styles/orders/order-info.css"
import { SelectedPizzaDetails } from "../../../schemes/selected-pizza-details-interface";
import { doughsNames, sizesNames, sizesValues, toppingsNames } from "../../../constants";

export const OrderInfoRoute: React.FC<{authorization: useAuthTokenInterface}> = ({authorization}) => {
  const { 
    isLoading, 
    isError, 
    data 
  } = useQuery<{order: orderData}>("orderData", () => fetchOrder(authorization.token, window.location.pathname.split("/")[2]));
  
  if (isLoading)
    return <h1>Loading</h1>

  if (isError)
    return <h1>Error</h1>
  

  const orderInfo = JSON.parse(data!.order!.receiverAddress.comment).info;
  console.log(data);
  console.log(orderInfo);
  const addressInfo = `Россия, г. Новосибирск, ул. ${data!.order!.receiverAddress.street}, д. ${data!.order!.receiverAddress.house}`;
  
  let pizzasInfo = <p>{orderInfo.map((e: SelectedPizzaDetails, idx: number) => <span key={idx}>{e.name}<br key={idx}/></span>)}</p>;

  const getPizzaInfo = (element: SelectedPizzaDetails) => {
    return <>
      {element.name},&nbsp;
      {sizesNames[element.size.name]}&nbsp;
      {sizesValues[element.size.name]},&nbsp;
      {doughsNames[element.doughs.name]}&nbsp;тесто&nbsp;
      {element.toppings.length != 0 ? "+ " + toppingsNames[element.toppings[0].name] : ""}
      {element.toppings.slice(1).map((e: {name: string}) => ", " + toppingsNames[e.name]).join("")}&nbsp;
    </>
  }
  
  return (
    <div>
      <Header authorization={authorization}></Header>
      <div className="order-content">
        <div>
          <p className="small-text">Статус</p>

        </div>
        <div>
          <p className="small-text">Адрес доставки</p>
        </div>
        <div>
          <p className="small-text">Состав заказа</p>
          {orderInfo.map((e: SelectedPizzaDetails, index: number) => <p key={index}>{getPizzaInfo(e)}</p>)}
        </div>
        <div>
          <p className="small-text">Сумма заказа</p>
        </div>
      </div>
    </div>
  );
};
  