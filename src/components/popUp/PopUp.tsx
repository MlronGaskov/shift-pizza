import "../../styles/popUp/popUp.css"
import crossLogo from "../../assets/images/popUp/cross.svg"
import { usePopUpInterface } from "../../hooks/usePopUp"
import { backendUrl } from "../../app/api/requests"
import { sizesValues, doughsNames } from "../../constants"
import { toppingsNames } from "../../constants"
import { useCartInterface } from "../../hooks/useCart"

interface PopUpProps {
  popUp: usePopUpInterface,
  onAddToCart?: () => void,
  onChange?: {"cart": useCartInterface, "index": number},
}

export const PopUp: React.FC<PopUpProps> = ({popUp, onAddToCart, onChange}) => {
  const sizeSelectionTab = (name: string, name_rus: string) => {
    const onClickToTab = () => popUp.patchPizzaDetails.setSize(name);
    const currentSizeName = popUp.pizzaDetails!.size.name;

    return <div className={`pop-up-tab ${currentSizeName === name ? 'chosen-tab' : ''}`} onClick={onClickToTab}>{name_rus}</div>
  }

  const sizeSelection = 
    <>
      <div className='size-selection-tabs'>
        <div className='size-selection-tabs-common-space'>
          {sizeSelectionTab("SMALL", "Маленькая")}
          {sizeSelectionTab("MEDIUM", "Средняя")}
          {sizeSelectionTab("LARGE", "Большая")}
        </div>
      </div>
    </>
  
  const swapDough = () => {
    if (popUp.pizzaDetails!.doughs.name == "THIN")
      popUp.patchPizzaDetails.setDough("THICK")
    if (popUp.pizzaDetails!.doughs.name == "THICK")
      popUp.patchPizzaDetails.setDough("THIN")
  }

  const doughSelection = 
    <>
      <p className='child-frame1-text2' onClick={swapDough}>
        {sizesValues[popUp.pizzaDetails!.size.name]}, {doughsNames[popUp.pizzaDetails!.doughs.name]} тесто
      </p>
    </>
  
  const getToppings = () => {
    const getTopping = (topping: {cost: number, img: string, name: string}, key: number) => {
      let isToppingAdded: boolean = false;
      for (let addedTopping of popUp.pizzaDetails!.toppings)
        if (addedTopping.name == topping.name)
          isToppingAdded = true;

      return <div 
        className={`topping-card ${isToppingAdded ? 'added-topping' : ''}`}
        key={key} 
        onClick={isToppingAdded ? () => popUp.patchPizzaDetails.deleteTopping(topping.name) : () => popUp.patchPizzaDetails.addTopping(topping.name)}
      >
        <img className="topping-img" src={backendUrl + topping.img}/>
        <div className="topping-card-content">
          <p className="topping-card-name">{toppingsNames[topping.name]}</p>
          <p className="topping-card-price">{topping.cost} ₽</p>
        </div>
	    </div>
    }

    let key = 1;
    return <div className="toppings-list">
      {popUp.selectedPizzaData!.toppings.map((e: {cost: number, img: string, name: string}) => getTopping(e, key++))}
    </div>
  }

  return (
    <div className="pop-up">
      <div className="pop-up-top">
        <img src={crossLogo} className="pop-up-cross" onClick={popUp.closePopUp}></img>
      </div>
      <div className="pop-up-body">
        <div className="pop-up-content">
          <img src={backendUrl + popUp.selectedPizzaData!.img} alt="pizza image" className="pizza-image"></img>
          <div className="pop-up-pizza-details">
            <div className="pop-up-scroll">

              <div className="pop-up-size-selection">
                <div className='child-frame1-text'>
                  <h1 className='child-frame1-text1'>{popUp.selectedPizzaData!.name}</h1>
                  {doughSelection}
                  <p className='child-frame1-text3'>{popUp.selectedPizzaData!.description}</p>
                </div>
                {sizeSelection}
              </div>

              <div className="pop-up-toppings">
                <p>Добавить по вкусу</p>
                {getToppings()}
              </div>

            </div>
            <button className="pop-up-add-to-cart" onClick={onAddToCart == null ? () => {
              const newCart = [...onChange!.cart.cartItems];
              newCart[onChange!.index].setDetails(popUp.pizzaDetails!);
              onChange!.cart.setCart(newCart);
              popUp.closePopUp()} : onAddToCart}>Добавить в корзину</button>
          </div>
        </div>
      </div>
		</div>
  );
};
