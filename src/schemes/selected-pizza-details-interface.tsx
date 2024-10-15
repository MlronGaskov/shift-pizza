export interface SelectedPizzaDetails {
  id: string,
  name: string,
  description: string,
  doughs: {name: string, price: number}
  size: {name: string, price: number}
  toppings: Array<{name: string, cost: number, img: string}>
}