import "../../styles/catalog/PizzaCard.css"

interface PizzaCardProps {
  id: string,
  img: string,
  name: string,
  description: string,
  price: number,
  selectPizza: () => void,
}

export const PizzaCardContent: React.FC<PizzaCardProps> = (props: PizzaCardProps) => {
  return (
    <>
      <img className="pizza-card-img" src={props.img} alt="pizza image"/>
      <div className="pizza-card-content">
        <div className="pizza-card-content-1">
          <div className="pizza-card-name">{props.name}</div>
          <div className="pizza-card-description">{props.description}</div>  
        </div>
        <div className="pizza-card-content-2">
          <div className="pizza-card-price">От {props.price} ₽</div>
          <button className="pizza-card-select-button" onClick={props.selectPizza}>Выбрать</button>
        </div>
      </div>
		</>
  );
};
