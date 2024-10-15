import { PizzaCardContent } from "../../components/catalog/PizzaCard";
import { Header } from "../../components/header/Header";
import { PizzaData } from "../../schemes/pizza-data-interface";
import { useQuery } from "react-query";

import { backendUrl } from "../api/requests";
import { fetchCatalog } from "../api/requests";
import "../../styles/catalog/catalog.css"
import usePopUp from "../../hooks/usePopUp";
import { PopUp } from "../../components/popUp/PopUp";
import { useAuthTokenInterface } from "../../hooks/useAuthToken";
import { useCartInterface } from "../../hooks/useCart";


const getPizzaCard = (item: PizzaData, selectPizza: (e: PizzaData) => void): JSX.Element => {
  const url = backendUrl + item.img;
  const prices_sizes = item.sizes.map((element) => element.price);
  const prices_doughs = item.doughs.map((element) => element.price);
  const minPrice = Math.min(...prices_sizes) + Math.min(...prices_doughs);
  return (
    <div className="pizza-card" key={item.id}>
      <PizzaCardContent 
        id={item.id}
        img={url} 
        name={item.name} 
        description={item.description} 
        price={minPrice}
        selectPizza={() => selectPizza(item)}
      />
    </div>
  );
}

export const CatalogRoute: React.FC<{authorization: useAuthTokenInterface, cart: useCartInterface}> = ({authorization, cart}) => {
  const { 
    isLoading, 
    isError, 
    data 
  } = useQuery<{success: boolean, catalog: Array<PizzaData>}>("catalogData", fetchCatalog);

  const popUp = usePopUp();

  if (isLoading) 
    return <div>Loading...</div>;
  if (isError) 
    return <div>Error fetching data</div>;

  const onAddToCart = popUp.pizzaDetails == null ? 
    popUp.closePopUp : 
    () => {cart.addToCart(popUp.pizzaDetails!, popUp.selectedPizzaData!); popUp.closePopUp()}
  
  return (
    <div>
      {popUp.isPopUpOpen ? <PopUp popUp={popUp} onAddToCart={() => {onAddToCart()}}></PopUp> : null}
      {popUp.isPopUpOpen && <div className="dark-overlay" onClick={popUp.closePopUp}/>}
      <Header authorization={authorization}></Header>
      <div className="content">
        <div className="catalog">
          {data!.catalog.map((item: PizzaData) => getPizzaCard(item, popUp.selectPizza))}

       `</div>
      </div>
      <footer></footer>
    </div>
  );
};
